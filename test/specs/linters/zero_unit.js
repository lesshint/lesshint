var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var zeroUnit = require('../../../lib/linters/zero_unit');

    describe('#zeroUnit()', function () {
        it('should report units on zero values when "style" is "no_unit"', function () {
            var source = '.foo { margin-right: 0px; }';
            var actual;
            var ast;

            var expected = {
                column: 22,
                file: 'test.less',
                line: 1,
                linter: 'zeroUnit',
                message: 'Unit should be omitted on zero values.'
            };

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'no_unit'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = zeroUnit({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, zeroUnit({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, zeroUnit({
                config: options,
                node: ast
            }));
        });

        it('should report missing units on zero values when "style" is "keep_unit"', function () {
            var source = '.foo { margin-right: 0; }';
            var actual;
            var ast;

            var expected = {
                column: 22,
                file: 'test.less',
                line: 1,
                linter: 'zeroUnit',
                message: 'Unit should not be omitted on zero values.'
            };

            var options = {
                zeroUnit: {
                    enabled: true,
                    style: 'keep_unit'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = zeroUnit({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, zeroUnit({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, zeroUnit({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { margin-left: 0px; }';
            var ast;
            var options = {
                zeroUnit: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, zeroUnit({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(zeroUnit.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
