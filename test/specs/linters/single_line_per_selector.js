'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#singleLinePerSelector()', function () {
        it('should allow selectors on separate lines', function () {
            var source = '.foo, \n.bar {}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow multiple selectors on the same line', function () {
            var source = '.foo, .bar {}';
            var result;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                message: 'Each selector should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow the comma on a new line', function () {
            var source = '.foo\n,.bar {}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should allow selectors with short names on the same line when "style" is "18f"', function () {
            var source = '.foo, .bar {}';
            var result;
            var ast;

            var options = {
                style: '18f'
            };

            ast = parseAST(source);
            ast = ast.first('ruleset');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow selectors with long names on the same line when "style" is "18f"', function () {
            var source = '.foobar, .bar {}';
            var result;
            var ast;

            var options = {
                style: '18f'
            };

            var expected = [{
                column: 9,
                line: 1,
                message: 'Each selector should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
