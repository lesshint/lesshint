var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var borderZero = require('../../../lib/linters/border_zero');

    describe('#borderZero()', function () {
        it('should allow "none" as a value when style is "none" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, borderZero({
                config: options,
                node: ast
            }));
        });

        it('should allow 0 as a value when style is "zero" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, borderZero({
                config: options,
                node: ast
            }));
        });

        it('should not allow 0 as a value when style is "none" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var actual;
            var ast;

            var expected = {
                column: 16,
                file: 'test.less',
                line: 1,
                linter: 'borderZero',
                message: 'Border properties should use "none" instead of 0.'
            };

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = borderZero({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow "none" as a value when style is "zero" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var actual;
            var ast;

            var expected = {
                column: 16,
                file: 'test.less',
                line: 1,
                linter: 'borderZero',
                message: 'Border properties should use 0 instead of "none".'
            };

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = borderZero({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow "none" as a value when style is "none" and the property is "border-bottom"', function () {
            var source = '.foo { border-bottom: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, borderZero({
                config: options,
                node: ast
            }));
        });

        it('should allow "none" as a value when style is "none" and the property is "border-left"', function () {
            var source = '.foo { border-left: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, borderZero({
                config: options,
                node: ast
            }));
        });

        it('should allow "none" as a value when style is "none" and the property is "border-right"', function () {
            var source = '.foo { border-right: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, borderZero({
                config: options,
                node: ast
            }));
        });

        it('should allow "none" as a value when style is "none" and the property is "border-top"', function () {
            var source = '.foo { border-top: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, borderZero({
                config: options,
                node: ast
            }));
        });

        it('should not do anything when there is a actual border specified', function () {
            var source = '.foo { border: 1px solid #000000; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, borderZero({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { border: 0; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(borderZero.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
