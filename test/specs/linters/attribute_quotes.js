'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#attributeQuotes()', function () {
        it('should allow single quotes', function () {
            var source = "input[type='text'] {}";
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should allow double quotes', function () {
            var source = 'input[type="text"] {}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing quotes', function () {
            var source = 'input[type=text] {}';
            var result;
            var ast;

            var expected = [{
                column: 12,
                line: 1,
                message: 'Attribute selectors should use quotes.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
