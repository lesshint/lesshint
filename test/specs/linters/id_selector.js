'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#idSelector()', function () {
        it('should allow selectors without IDs', function () {
            var source = '.foo {}';
            var result;
            var ast;

            var options = {
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow IDs in selectors', function () {
            var source = '.foo #bar {}';
            var result;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                message: 'Selectors should not use IDs.'
            }];

            var options = {
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow excluded IDs', function () {
            var source = '#foo {}';
            var result;
            var ast;

            var options = {
                exclude: ['foo']
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow excluded IDs defined with #', function () {
            var source = '#foo {}';
            var result;
            var ast;

            var options = {
                exclude: ['#foo']
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow IDs that are not excluded', function () {
            var source = '.foo #bar {}';
            var result;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                message: 'Selectors should not use IDs.'
            }];

            var options = {
                exclude: ['foo']
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
