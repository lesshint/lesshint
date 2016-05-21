'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#qualifyingElement()', function () {
        it('should have the proper node types', function () {
            var source = 'input[type="text"] {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow selectors without any qualifying element', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow ID selector with a qualifying element', function () {
            var source = 'div#foo {}';
            var expected = [{
                column: 4,
                line: 1,
                message: 'Id selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow class selector with a qualifying element', function () {
            var source = 'div.foo {}';
            var expected = [{
                column: 4,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow attribute selector with a qualifying element', function () {
            var source = 'div[foo="bar"] {}';
            var expected = [{
                column: 4,
                line: 1,
                message: 'Attribute selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow ID selector with a qualifying element when "allowWithId" is "true"', function () {
            var source = 'div#foo {}';
            var options = {
                allowWithId: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow class selector with a qualifying element when "allowWithClass" is "true"', function () {
            var source = 'div.foo {}';
            var options = {
                allowWithClass: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow attribute selector with a qualifying element when "allowWithAttribute" is "true"', function () {
            var source = 'div[foo="bar"] {}';
            var options = {
                allowWithAttribute: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow a class with a qualifying element in a descendant selector', function () {
            var source = '.foo div.bar {}';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check parent selectors. #106', function () {
            var source = 'a { &.active { color: red; } }';
            var expected = [{
                column: 6,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
