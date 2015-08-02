var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var trailingWhitespace = require('../../../lib/linters/trailing_whitespace');

    describe('#trailingWhitespace()', function () {
        it('should allow lines with no trailing whitespace', function () {
            var source = '.foo {}';
            var ast;

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, trailingWhitespace({
                config: options,
                node: ast
            }));
        });

        it('should allow lines with trailing new line characters', function () {
            var source = '.foo {}\n';
            var ast;

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, trailingWhitespace({
                config: options,
                node: ast
            }));
        });

        it('should not allow lines with trailing whitespace', function () {
            var source = '.foo {}  ';
            var actual;
            var ast;

            var expected = [{
                column: null,
                line: 1,
                linter: 'trailingWhitespace',
                message: "There should't be any trailing whitespace."
            }];

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);

            actual = trailingWhitespace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow lines with trailing tabs', function () {
            var source = '.foo {} \t';
            var actual;
            var ast;

            var expected = [{
                column: null,
                line: 1,
                linter: 'trailingWhitespace',
                message: "There should't be any trailing whitespace."
            }];

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);

            actual = trailingWhitespace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo {}  ';
            var ast;
            var options = {
                trailingWhitespace: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);

            assert.equal(null, trailingWhitespace({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo {}  ';
            var ast;
            var options = {
                trailingWhitespace: false
            };

            ast = linter.parseAST(source);

            assert.equal(null, trailingWhitespace({
                config: options,
                node: ast
            }));
        });
    });
});
