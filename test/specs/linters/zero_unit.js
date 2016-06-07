'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#zeroUnit()', function () {
        it('should have the proper node types', function () {
            var source = 'margin-right: 0px;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should report units on zero values when "style" is "no_unit"', function () {
            var source = 'margin-right: 0px;';
            var expected = [{
                column: 15,
                line: 1,
                message: 'Unit should be omitted on zero values.'
            }];

            var options = {
                style: 'no_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not report anything on zero values without units when "style" is "no_unit"', function () {
            var source = 'margin-right: 0;';
            var options = {
                style: 'no_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report units on zero values when "style" is "keep_unit"', function () {
            var source = 'margin-right: 0px;';
            var options = {
                style: 'keep_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should report missing units on zero values when "style" is "keep_unit"', function () {
            var source = 'margin-right: 0;';
            var expected = [{
                column: 15,
                line: 1,
                message: 'Unit should not be omitted on zero values.'
            }];

            var options = {
                style: 'keep_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not report units on zero values when the unit is an angle and "style" is "no_unit"', function () {
            var source = 'transform: rotate(90deg);';
            var options = {
                style: 'no_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report units on zero values when the unit is a time and "style" is "no_unit"', function () {
            var source = 'transition: all 0s;';
            var options = {
                style: 'no_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report units on zero values when the unit is configured and "style" is "no_unit"', function () {
            var source = 'margin-left: 0zz;';
            var options = {
                style: 'no_unit',
                units: ['zz']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report units on zero values when the the property does not have units and "style" is "no_unit"', function () {
            var source = 'z-index: 0;';
            var options = {
                style: 'no_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report units on zero values when the the property does not have units and "style" is "no_unit"', function () {
            var source = 'margin-left: 0;';
            var options = {
                style: 'no_unit',
                exclude: ['margin-left']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check function arguments', function () {
            var source = 'color: rgb(0, 0, 0);';
            var options = {
                style: 'no_unit'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            var source = 'margin-right: 0;';
            var options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                var lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
