var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var emptyRule = require('../../../lib/linters/empty_rule');

    describe('#emptyRule()', function () {
        it('should allow rules with declarations', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                emptyRule: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, emptyRule({
                config: options,
                node: ast
            }));
        });

        it('should not allow empty rules', function () {
            var source = '.foo {}';
            var actual;
            var ast;

            var expected = {
                column: 1,
                file: 'test.less',
                line: 1,
                linter: 'emptyRule',
                message: 'There shouldn\'t be any empty rules present.'
            };

            var options = {
                emptyRule: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first();

            actual = emptyRule({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow rules with only mixins (#16)', function () {
            var source = '.foo { .mixin(); }';
            var ast;

            var options = {
                emptyRule: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, emptyRule({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                emptyRule: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.equal(null, emptyRule({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                emptyRule: false
            };

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.equal(null, emptyRule({
                config: options,
                node: ast
            }));
        });
    });
});
