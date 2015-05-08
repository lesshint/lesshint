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
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(true, idSelector({
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
                    enabled: true
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
                    enabled: false
                }
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
