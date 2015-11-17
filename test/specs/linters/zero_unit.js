'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#zeroUnit()', function () {
        it('should report units on zero values when "style" is "no_unit"', function () {
            var source = '.foo { margin-right: 0px; }';
            var result;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                message: 'Unit should be omitted on zero values.'
            }];

            var options = {
                style: 'no_unit'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report anything on zero values without units when "style" is "no_unit"', function () {
            var source = '.foo { margin-right: 0; }';
            var result;
            var ast;

            var options = {
                style: 'no_unit'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not report units on zero values when "style" is "keep_unit"', function () {
            var source = '.foo { margin-right: 0px; }';
            var result;
            var ast;

            var options = {
                style: 'keep_unit'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should report missing units on zero values when "style" is "keep_unit"', function () {
            var source = '.foo { margin-right: 0; }';
            var result;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                message: 'Unit should not be omitted on zero values.'
            }];

            var options = {
                style: 'keep_unit'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report units on zero values when the unit is an angle and "style" is "no_unit"', function () {
            var source = '.foo { transform: rotate(90deg); }';
            var result;
            var ast;

            var options = {
                style: 'no_unit'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should not report units on zero values when the unit is a time and "style" is "no_unit"', function () {
            var source = '.foo { transition: all 0s; }';
            var result;
            var ast;

            var options = {
                style: 'no_unit'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { margin-right: 0; }';
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
