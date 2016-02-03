'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#qualifyingElement()', function () {
        it('should allow selectors without any qualifying element', function () {
            var source = '.foo {}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow ID selector with a qualifying element', function () {
            var source = 'div#foo {}';
            var result;
            var ast;

            var expected = [{
                column: 4,
                line: 1,
                message: 'Id selectors should not include a qualifying element.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow class selector with a qualifying element', function () {
            var source = 'div.foo {}';
            var result;
            var ast;

            var expected = [{
                column: 4,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow attribute selector with a qualifying element', function () {
            var source = 'div[foo="bar"] {}';
            var result;
            var ast;

            var expected = [{
                column: 4,
                line: 1,
                message: 'Attribute selectors should not include a qualifying element.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow ID selector with a qualifying element when "allowWithId" is "true"', function () {
            var source = 'div#foo {}';
            var result;
            var ast;

            var options = {
                allowWithId: true
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow class selector with a qualifying element when "allowWithClass" is "true"', function () {
            var source = 'div.foo {}';
            var result;
            var ast;

            var options = {
                allowWithClass: true
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow attribute selector with a qualifying element when "allowWithAttribute" is "true"', function () {
            var source = 'div[foo="bar"] {}';
            var result;
            var ast;

            var options = {
                allowWithAttribute: true
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow a class with a qualifying element in a descendant selector', function () {
            var source = '.foo div.bar {}';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('selector');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should check parent selectors. #106', function () {
            var source = 'a { &.active { color: red; } }';
            var result;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('block').first('ruleset').first('selector');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
