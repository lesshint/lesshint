var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var urlQuotes = require('../../../lib/linters/url_quotes');

    describe('#urlQuotes()', function () {
        it('should allow single quotes when "style" is "single"', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, urlQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow double quotes when "style" is "single"', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var actual;
            var ast;

            var expected = {
                column: 26,
                file: 'test.less',
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should use single quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'single'
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

        it('should not allow missing quotes when "style" is "single"', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var actual;
            var ast;

            var expected = {
                column: 26,
                file: 'test.less',
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should use single quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'single'
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

        it('should allow double quotes when "style" is "double"', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, urlQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow single quotes when "style" is "double"', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var actual;
            var ast;

            var expected = {
                column: 26,
                file: 'test.less',
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should use double quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'double'
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

        it('should not allow missing quotes when "style" is "double"', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var actual;
            var ast;

            var expected = {
                column: 26,
                file: 'test.less',
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should use double quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'double'
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

        it('should allow missing quotes when "style" is "no_quotes"', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'no_quotes'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, urlQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow single quotes when "style" is "no_quotes"', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var actual;
            var ast;

            var expected = {
                column: 26,
                file: 'test.less',
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should not use quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'no_quotes'
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

        it('should not allow double quotes when "style" is "no_quotes"', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var actual;
            var ast;

            var expected = {
                column: 26,
                file: 'test.less',
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should not use quotes.'
            };

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'no_quotes'
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

        it('should throw on invalid "style" value', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(urlQuotes.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
