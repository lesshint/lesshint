var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var urlQuotes = require('../../../lib/linters/url_quotes');

    describe('#urlQuotes()', function () {
        it('should allow single quotes', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, urlQuotes({
                config: options,
                node: ast
            }));
        });

        it('should allow double quotes', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, urlQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing quotes', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var actual;
            var ast;

            var expected = {
                column: 26,
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should enclosed in quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = urlQuotes({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow quoted URLs strings surrounded by spaces (#22)', function () {
            var source = ".foo { background-image: url( 'img/image.jpg' ); }";
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, urlQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow unquoted URLs strings surrounded by spaces (#22)', function () {
            var source = '.foo { background-image: url( img/image.jpg ); }';
            var actual;
            var ast;

            var expected = {
                column: 26,
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should enclosed in quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = urlQuotes({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var ast;
            var options = {
                urlQuotes: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, urlQuotes({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var ast;
            var options = {
                urlQuotes: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, urlQuotes({
                config: options,
                node: ast
            }));
        });
    });
});
