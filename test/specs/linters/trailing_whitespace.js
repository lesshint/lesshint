'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#trailingWhitespace()', function () {
        it('should allow lines with no trailing whitespace', function () {
            var source = '.foo {}';
            var result;
            var ast;

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should allow lines with trailing new line characters', function () {
            var source = '.foo {}\n';
            var result;
            var ast;

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow lines with trailing whitespace', function () {
            var source = '.foo {}  ';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: "There should't be any trailing whitespace."
            }];

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow lines with trailing tabs', function () {
            var source = '.foo {} \t';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: "There should't be any trailing whitespace."
            }];

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should ignore empty files', function () {
            var source = '';
            var result;
            var ast;

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });
    });
});
