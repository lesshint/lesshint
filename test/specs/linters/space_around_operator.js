'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#spaceAroundOperator', function () {
        it('should allow one space before and after operator when "style" is "both"', function () {
            var source = '.foo { height: calc(10px + 10px); }';
            var result;
            var ast;

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space before operator when "style" is "both"', function () {
            var source = '.foo { height: calc(10px+ 10px); }';
            var result;
            var ast;

            var expected = [{
                column: 21,
                line: 1,
                message: 'Operators should be preceded and followed by one space.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow missing space after operator when "style" is "both"', function () {
            var source = '.foo { height: calc(10px +10px); }';
            var result;
            var ast;

            var expected = [{
                column: 27,
                line: 1,
                message: 'Operators should be preceded and followed by one space.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow a missing space before operator when "style" is "none"', function () {
            var source = '.foo { height: calc(10px+10px); }';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow one space before operator when "style" is "none"', function () {
            var source = '.foo { height: calc(10px + 10px); }';
            var result;
            var ast;

            var expected = [{
                column: 25,
                line: 1,
                message: 'Operators should not be preceded nor followed by any space.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow a missing space after operator when "style" is "none"', function () {
            var source = '.foo { height: calc(10px+10px); }';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow one space after operator when "style" is "none"', function () {
            var source = '.foo { height: calc(10px+ 10px); }';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                message: 'Operators should not be preceded nor followed by any space.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report on commas', function () {
            var source = '@var: rgb(255,255,255);';
            var result;
            var ast;

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { height: calc(10px+10px); }';
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);
            ast = ast.first();

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
