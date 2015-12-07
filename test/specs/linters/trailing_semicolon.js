'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#trailingSemicolon()', function () {
        it('should not allow missing semicolons', function () {
            var source = '.foo { color: red }';
            var result;
            var ast;

            var expected = [{
                column: 18,
                line: 1,
                message: 'All property declarations should end with a semicolon.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow semicolons', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should ignore empty rules', function () {
            var source = '.foo {}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should ignore empty rules with new lines', function () {
            var source = '.foo {\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should allow semicolons in rulesets in @media declarations (#15)', function () {
            var source = '@media screen and (max-width: 768px) { @color: red; .div { color: @color; } }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it("should not report a missing when there's a space before the semicolon", function () {
            var source = '.foo { color: red ; }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });
    });
});
