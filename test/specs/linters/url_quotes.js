'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#urlQuotes()', function () {
        it('should allow single quotes', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow double quotes', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow missing quotes', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should be enclosed in quotes.'
            }];

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing quotes in imports', function () {
            var source = '@import url(http://google.de)';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should be enclosed in quotes.'
            }];

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow quoted urls in imports', function () {
            var source = '@import url(\'http://google.de\')';
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow quoted URLs strings surrounded by spaces (#22)', function () {
            var source = ".foo { background-image: url( 'img/image.jpg' ); }";
            var ast;

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow unquoted URLs strings surrounded by spaces (#22)', function () {
            var source = '.foo { background-image: url( img/image.jpg ); }';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'urlQuotes',
                message: 'URLs should be enclosed in quotes.'
            }];

            var options = {
                urlQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var ast;
            var options = {
                urlQuotes: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });
    });
});
