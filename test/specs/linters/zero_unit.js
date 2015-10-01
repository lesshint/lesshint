var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#zeroUnit()', function () {
        it('should report units on zero values when "style" is "no_unit"', function () {
            var source = '.foo { margin-right: 0px; }';
            var actual;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                linter: 'zeroUnit',
                message: 'Unit should be omitted on zero values.'
            }];

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'no_unit'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report anything on zero values without units when "style" is "no_unit"', function () {
            var source = '.foo { margin-right: 0; }';
            var ast;

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'no_unit'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not report units on zero values when "style" is "keep_unit"', function () {
            var source = '.foo { margin-right: 0px; }';
            var ast;

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'keep_unit'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should report missing units on zero values when "style" is "keep_unit"', function () {
            var source = '.foo { margin-right: 0; }';
            var actual;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                linter: 'zeroUnit',
                message: 'Unit should not be omitted on zero values.'
            }];

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'keep_unit'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report units on zero values when the unit is an angle and "style" is "no_unit"', function () {
            var source = '.foo { transform: rotate(90deg); }';
            var ast;

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'no_unit'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not report units on zero values when the unit is a time and "style" is "no_unit"', function () {
            var source = '.foo { transition: all 0s; }';
            var ast;

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'no_unit'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { margin-left: 0px; }';
            var ast;
            var options = {
                zeroUnit: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { margin-left: 0px; }';
            var ast;

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
