var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var comment = require('../../../lib/linters/comment');

    describe('#comment()', function () {
        it('should allow single line comments', function () {
            var source = "// Hello world";
            var ast;

            var options = {
                comment: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source).first('singlelineComment');

            assert.strictEqual(null, comment({
                config: options,
                node: ast
            }));
        });

        it('should not allow multi-line comments', function () {
            var source = '/* Hello world */';
            var actual;
            var ast;

            var expected = {
                column: 1,
                file: 'test.less',
                line: 1,
                linter: 'comment',
                message: 'There shouldn\'t be any multi-line comments.'
            };

            var options = {
                comment: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source).first('multilineComment');

            actual = comment({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow comments matching "allowed" option regexp', function () {
            var source = "/*! Hello world */";
            var ast;

            var options = {
                comment: {
                    allowed: '^!',
                    enabled: true
                }
            };

            ast = linter.parseAST(source).first('multilineComment');

            assert.strictEqual(true, comment({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = '/* Hello world */';
            var ast;
            var options = {
                comment: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source).first('multilineComment');

            assert.equal(null, comment({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '/* Hello world */';
            var ast;
            var options = {
                comment: false
            };

            ast = linter.parseAST(source).first('multilineComment');

            assert.equal(null, comment({
                config: options,
                node: ast
            }));
        });
    });
});
