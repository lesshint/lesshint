'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#urlQuotes()', function () {
        it('should allow single quotes', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should allow double quotes', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing quotes', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow missing quotes in imports', function () {
            var source = '@import url(http://example.com)';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            ast = parseAST(source);
            ast = ast.first('atrule');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow quoted urls in imports', function () {
            var source = "@import url('http://example.com')";
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('atrule');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should allow quoted URLs strings surrounded by spaces (#22)', function () {
            var source = ".foo { background-image: url( 'img/image.jpg' ); }";
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow unquoted URLs strings surrounded by spaces (#22)', function () {
            var source = '.foo { background-image: url( img/image.jpg ); }';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
