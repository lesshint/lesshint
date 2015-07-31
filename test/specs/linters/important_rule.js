var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var importantRule = require('../../../lib/linters/important_rule');

    describe('#importantRule()', function () {
        it('should not do anything when there is no !important present', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                importantRule: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, importantRule({
                config: options,
                node: ast
            }));
        });

        it('should not allow !important', function () {
            var source = '.foo { color: red !important; }';
            var actual;
            var ast;

            var expected = {
                column: 19,
                line: 1,
                linter: 'importantRule',
                message: '!important should not be used.'
            };

            var options = {
                importantRule: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = importantRule({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { border: none; }';
            var ast;
            var options = {
                importantRule: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, importantRule({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { border: none; }';
            var ast;
            var options = {
                importantRule: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, importantRule({
                config: options,
                node: ast
            }));
        });
    });
});
