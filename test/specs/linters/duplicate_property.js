var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#duplicateProperty()', function () {
        it('should allow single instances of each property', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow duplicate properties', function () {
            var source = '.foo { color: red; color: blue; }';
            var actual;
            var ast;

            var expected = [{
                column: 20,
                line: 1,
                linter: 'duplicateProperty',
                message: 'Duplicate property: "color".'
            }];

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow excluded properties', function () {
            var source = '.foo { color: red; color: green; }';
            var ast;

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: ['color']
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow duplicates of properties that are not excluded', function () {
            var source = '.foo { color: red; color: green; }';
            var actual;
            var ast;

            var expected = [{
                column: 20,
                line: 1,
                linter: 'duplicateProperty',
                message: 'Duplicate property: "color".'
            }];

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: ['background']
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: red; color: blue; }';
            var ast;
            var options = {
                duplicateProperty: {
                    enabled: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: red; color: blue; }';
            var ast;
            var options = {
                duplicateProperty: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });
    });
});
