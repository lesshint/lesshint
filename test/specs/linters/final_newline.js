var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var finalNewline = require('../../../lib/linters/final_newline');

    describe('#finalNewline()', function () {
        it('should allow files with final new lines', function () {
            var source = '.foo {}\n';
            var ast;

            var options = {
                finalNewline: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(true, finalNewline({
                config: options,
                node: ast
            }));
        });

        it('should not allow files without final new lines', function () {
            var source = '.foo {}';
            var actual;
            var ast;

            var expected = {
                column: null,
                file: 'test.less',
                line: null,
                linter: 'finalNewline',
                message: 'Files should end with a newline.'
            };

            var options = {
                finalNewline: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);

            actual = finalNewline({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                finalNewline: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);

            assert.equal(null, finalNewline({
                config: options,
                node: ast
            }));
        });
    });
});
