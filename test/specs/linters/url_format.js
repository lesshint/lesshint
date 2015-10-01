var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#urlFormat()', function () {
        it('should allow relative URLs when "style" is "relative"', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'relative'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow absolute URLs when "style" is "relative"', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'urlFormat',
                message: 'URL "http://example.com/img/image.jpg" should be relative.'
            }];

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'relative'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow absolute URLs when "style" is "absolute"', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'absolute'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow relative URLs when "style" is "absolute"', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'urlFormat',
                message: 'URL "img/image.jpg" should be absolute.'
            }];

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'absolute'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should treat absolute URLs without a protocol as such when "style" is "relative"', function () {
            var source = '.foo { background-image: url(//example.com/img/image.jpg); }';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'urlFormat',
                message: 'URL "//example.com/img/image.jpg" should be relative.'
            }];

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'relative'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should treat absolute URLs without a protocol as such when "style" is "absolute"', function () {
            var source = '.foo { background-image: url(//example.com/img/image.jpg); }';
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'absolute'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle relative URLs with single quotes', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'relative'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle relative URLs with double quotes', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'relative'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle absolute URLs with single quotes', function () {
            var source = ".foo { background-image: url('http://example.com/img/image.jpg'); }";
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'absolute'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle absolute URLs with double quotes', function () {
            var source = '.foo { background-image: url("http://example.com/img/image.jpg"); }';
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'absolute'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle quoted relative URLs surrounded by spaces (#22)', function () {
            var source = ".foo { background-image: url( 'img/image.jpg' ); }";
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'relative'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle unquoted URLs surrounded by spaces (#22)', function () {
            var source = '.foo { background-image: url( img/image.jpg ); }';
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'relative'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var ast;
            var options = {
                urlFormat: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var ast;
            var options = {
                urlFormat: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var ast;

            var options = {
                urlFormat: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(lint.bind(undefined, options, ast), Error);
        });
    });
});
