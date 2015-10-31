'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#stringQuotes()', function () {
        it('should allow single quotes when "style" is "single"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow double quotes when "style" is "single"', function () {
            var source = '.foo { content: "Hello world"; }';
            var actual;
            var ast;

            var expected = [{
                column: 17,
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use single quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow double quotes when "style" is "double"', function () {
            var source = '.foo { content: "Hello world"; }';
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow single quotes when "style" is "double"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var actual;
            var ast;

            var expected = [{
                column: 17,
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use double quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = parseAST(source);

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should handle quotes in functions', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle concatenated strings', function () {
            var source = ".foo { content: ' (' attr(id) ')'; }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow single quotes in variable declarations when "style" is "single"', function () {
            var source = "@foo: 'Hello world';";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow double quotes in variable declarations when "style" is "single"', function () {
            var source = '@foo: "Hello world";';
            var actual;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use single quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow double quotes in variable declarations when "style" is "double"', function () {
            var source = '@foo: "Hello world";';
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow single quotes in variable declarations when "style" is "double"', function () {
            var source = "@foo: 'Hello world';";
            var actual;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use double quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = parseAST(source);

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = ".foo { content: 'Hello world' }";
            var ast;
            var options = {
                stringQuotes: {
                    enabled: false
                }
            };

            ast = parseAST(source);

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = ".foo { content: 'Hello world' }";
            var ast;
            var options = {
                stringQuotes: false
            };

            ast = parseAST(source);

            assert.equal(null, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = ".foo { content: 'Hello world' }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
