var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var idSelector = require('../../../lib/linters/id_selector');

    describe('#idSelector()', function () {
        it('should allow selectors without IDs', function () {
            var source = '.foo {}';
            var ast;

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, idSelector({
                config: options,
                node: ast
            }));
        });

        it('should not allow IDs in selectors', function () {
            var source = '.foo #bar {}';
            var actual;
            var ast;

            var expected = {
                column: 6,
                file: 'test.less',
                line: 1,
                linter: 'idSelector',
                message: 'Selectors should not use IDs.'
            };

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            actual = idSelector({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow excluded IDs', function () {
            var source = '#foo {}';
            var ast;

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: ['foo']
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, idSelector({
                config: options,
                node: ast
            }));
        });

        it('should allow excluded IDs defined with #', function () {
            var source = '#foo {}';
            var ast;

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: ['#foo']
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, idSelector({
                config: options,
                node: ast
            }));
        });

        it('should not allow IDs that are not excluded', function () {
            var source = '.foo #bar {}';
            var actual;
            var ast;

            var expected = {
                column: 6,
                file: 'test.less',
                line: 1,
                linter: 'idSelector',
                message: 'Selectors should not use IDs.'
            };

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: ['foo']
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            actual = idSelector({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo #bar {}';
            var ast;
            var options = {
                idSelector: {
                    enabled: false,
                    exclude: []
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, idSelector({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo #bar {}';
            var ast;
            var options = {
                idSelector: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, idSelector({
                config: options,
                node: ast
            }));
        });
    });
});
