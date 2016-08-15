'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();
var parser = require('postcss-selector-parser');

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

        it('should not allow parent selectors when the parent is an element. #106', function () {
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

        it('should allow parent selectors when the parent is selector. #118', function () {
            var source = '.a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should inspect the parent selector', function () {
            var source = '.a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                var node = ast.root.first;
                var expected = { startsWith: 'class', endsWith: 'class', hasTag: false };
                var result;

                parser(function (selectors) {
                    node.selectorAst = selectors;
                    result = spec.linter.inspectParent(node.first);
                    expect(result).to.deep.equal(expected);

                }).process(node.selector);
            });
        });

        it('should inspect the parent selector, recognize tag', function () {
            var source = 'a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                var node = ast.root.first;
                var expected = { startsWith: 'tag', endsWith: 'tag', hasTag: true };
                var result;

                parser(function (selectors) {
                    node.selectorAst = selectors;
                    result = spec.linter.inspectParent(node.first);
                    expect(result).to.deep.equal(expected);

                }).process(node.selector);
            });
        });

        it('should inspect the parent selector, recognize tag and class', function () {
            var source = '.b a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                var node = ast.root.first;
                var expected = { startsWith: 'class', endsWith: 'tag', hasTag: true };
                var result;

                parser(function (selectors) {
                    node.selectorAst = selectors;
                    result = spec.linter.inspectParent(node.first);
                    expect(result).to.deep.equal(expected);

                }).process(node.selector);
            });
        });
    });
});
