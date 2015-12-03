'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#stringQuotes()', function () {
        it('should allow single quotes when "style" is "single"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var result;
            var ast;

            var options = {
                style: 'single'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow double quotes when "style" is "single"', function () {
            var source = '.foo { content: "Hello world"; }';
            var result;
            var ast;

            var expected = [{
                column: 17,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            var options = {
                style: 'single'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow double quotes when "style" is "double"', function () {
            var source = '.foo { content: "Hello world"; }';
            var result;
            var ast;

            var options = {
                style: 'double'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow single quotes when "style" is "double"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var result;
            var ast;

            var expected = [{
                column: 17,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            var options = {
                style: 'double'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should handle quotes in functions', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var result;
            var ast;

            var options = {
                style: 'single'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should handle concatenated strings', function () {
            var source = ".foo { content: ' (' attr(id) ')'; }";
            var result;
            var ast;

            var options = {
                style: 'single'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow single quotes in variable declarations when "style" is "single"', function () {
            var source = "@foo: 'Hello world';";
            var result;
            var ast;

            var options = {
                style: 'single'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow double quotes in variable declarations when "style" is "single"', function () {
            var source = '@foo: "Hello world";';
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            var options = {
                style: 'single'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow double quotes in variable declarations when "style" is "double"', function () {
            var source = '@foo: "Hello world";';
            var result;
            var ast;

            var options = {
                style: 'double'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow single quotes in variable declarations when "style" is "double"', function () {
            var source = "@foo: 'Hello world';";
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            var options = {
                style: 'double'
            };

            ast = parseAST(source);

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should throw on invalid "style" value', function () {
            var source = ".foo { content: 'Hello world' }";
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
