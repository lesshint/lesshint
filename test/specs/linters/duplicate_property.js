'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#duplicateProperty()', function () {
        it('should allow single instances of each property', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            var options = {
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow duplicate properties', function () {
            var source = '.foo { color: red; color: blue; }';
            var result;
            var ast;

            var expected = [{
                column: 20,
                line: 1,
                message: 'Duplicate property: "color".'
            }];

            var options = {
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow excluded properties', function () {
            var source = '.foo { color: red; color: green; }';
            var result;
            var ast;

            var options = {
                exclude: ['color']
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow duplicates of properties that are not excluded', function () {
            var source = '.foo { color: red; color: green; }';
            var result;
            var ast;

            var expected = [{
                column: 20,
                line: 1,
                message: 'Duplicate property: "color".'
            }];

            var options = {
                exclude: ['background']
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
