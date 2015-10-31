'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#trailingSemicolon()', function () {
        it('should not allow missing semicolons', function () {
            var source = '.foo { color: red }';
            var actual;
            var ast;

            var expected = [{
                column: 18,
                line: 1,
                linter: 'trailingSemicolon',
                message: 'All property declarations should end with a semicolon.'
            }];

            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow semicolons', function () {
            var source = '.foo { color: red; }';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should ignore empty rules', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should ignore empty rules but with new lines', function () {
            var source = '.foo {\n}';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should allow semicolons in rulesets in @media declarations (#15)', function () {
            var source = '@media screen and (max-width: 768px) { @color: red; .div { color: @color; } }';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should not report a missing when there\'s a space before the semicolon', function () {
            var source = '.foo { color: red ; }';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: red }';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: red }';
            var ast;
            var options = {
                trailingSemicolon: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });
    });
});
