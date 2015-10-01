var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#trailingZero()', function () {
        it('should allow trailing zero when "style" is "include_zero"', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'with'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should not allow a missing trailing zero when "style" is "include_zero"', function () {
            var source = '.foo { font-size: 1.5em; }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'trailingZero',
                message: '1.5 should be written with trailing zeros.'
            }];

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'with'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow missing trailing zero when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 1.5em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'without'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should not allow a trailing zero when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 1.50em; }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'trailingZero',
                message: '1.50 should be written without trailing zeros.'
            }];

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'without'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow multiple trailing zeros when "style" is "include_zero"', function () {
            var source = '.foo { font-size: 1.500em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'with'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should not allow multiple trailing zeros when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 1.500em; }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'trailingZero',
                message: '1.500 should be written without trailing zeros.'
            }];

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'without'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;
            var options = {
                trailingZero: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(lint.bind(undefined, options, ast), Error);
        });
    });
});
