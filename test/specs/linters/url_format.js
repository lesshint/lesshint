'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#urlFormat()', function () {
        it('should allow relative URLs when "style" is "relative"', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var result;
            var ast;

            var options = {
                style: 'relative'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow absolute URLs when "style" is "relative"', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                message: 'URL "http://example.com/img/image.jpg" should be relative.'
            }];

            var options = {
                style: 'relative'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow absolute URLs when "style" is "absolute"', function () {
            var source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            var result;
            var ast;

            var options = {
                style: 'absolute'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow relative URLs when "style" is "absolute"', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                message: 'URL "img/image.jpg" should be absolute.'
            }];

            var options = {
                style: 'absolute'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should treat absolute URLs without a protocol as such when "style" is "relative"', function () {
            var source = '.foo { background-image: url(//example.com/img/image.jpg); }';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                message: 'URL "//example.com/img/image.jpg" should be relative.'
            }];

            var options = {
                style: 'relative'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should treat absolute URLs without a protocol as such when "style" is "absolute"', function () {
            var source = '.foo { background-image: url(//example.com/img/image.jpg); }';
            var result;
            var ast;

            var options = {
                style: 'absolute'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should handle relative URLs with single quotes', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var result;
            var ast;

            var options = {
                style: 'relative'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should handle relative URLs with double quotes', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var result;
            var ast;

            var options = {
                style: 'relative'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should handle absolute URLs with single quotes', function () {
            var source = ".foo { background-image: url('http://example.com/img/image.jpg'); }";
            var result;
            var ast;

            var options = {
                style: 'absolute'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should handle absolute URLs with double quotes', function () {
            var source = '.foo { background-image: url("http://example.com/img/image.jpg"); }';
            var result;
            var ast;

            var options = {
                style: 'absolute'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should handle quoted relative URLs surrounded by spaces (#22)', function () {
            var source = ".foo { background-image: url( 'img/image.jpg' ); }";
            var result;
            var ast;

            var options = {
                style: 'relative'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should handle unquoted URLs surrounded by spaces (#22)', function () {
            var source = '.foo { background-image: url( img/image.jpg ); }';
            var result;
            var ast;

            var options = {
                style: 'relative'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
