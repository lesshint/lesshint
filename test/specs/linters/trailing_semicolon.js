var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var trailingSemicolon = require('../../../lib/linters/trailing_semicolon');

    describe('#trailingSemicolon()', function () {
        it('should not allow missing semicolons', function () {
            var source = '.foo { color: red }';
            var actual;
            var ast;

            var expected = {
                column: 18,
                file: 'test.less',
                line: 1,
                linter: 'trailingSemicolon',
                message: 'All property declarations should end with a semicolon.'
            };

            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = trailingSemicolon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow semicolons', function () {
            var source = '.foo { color: red; }';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.equal(true, trailingSemicolon({
                config: options,
                node: ast
            }));
        });

        it('should ignore empty rules', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, trailingSemicolon({
                config: options,
                node: ast
            }));
        });

        it('should ignore empty rules but with new lines', function () {
            var source = '.foo {\n}';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.equal(true, trailingSemicolon({
                config: options,
                node: ast
            }));
        });

        it('should return null run when disabled', function () {
            var source = '.foo { color: red }';
            var ast;
            var options = {
                trailingSemicolon: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, trailingSemicolon({
                config: options,
                node: ast
            }));
        });
    });
});
