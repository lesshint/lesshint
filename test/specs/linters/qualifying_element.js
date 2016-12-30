'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();
const parser = require('postcss-selector-parser');

describe('lesshint', function () {
    describe('#qualifyingElement()', function () {
        it('should have the proper node types', function () {
            const source = 'input[type="text"] {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow class selectors without any qualifying element', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow ID selectors without any qualifying element', function () {
            const source = '#foo {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow tag selectors without any qualifying element', function () {
            const source = 'a {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow ID selector with a qualifying element', function () {
            const source = 'div#foo {}';
            const expected = [{
                column: 4,
                line: 1,
                message: 'Id selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow class selector with a qualifying element', function () {
            const source = 'div.foo {}';
            const expected = [{
                column: 4,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow attribute selector with a qualifying element', function () {
            const source = 'div[foo="bar"] {}';
            const expected = [{
                column: 4,
                line: 1,
                message: 'Attribute selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow ID selector with a qualifying element when "allowWithId" is "true"', function () {
            const source = 'div#foo {}';
            const options = {
                allowWithId: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow class selector with a qualifying element when "allowWithClass" is "true"', function () {
            const source = 'div.foo {}';
            const options = {
                allowWithClass: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow attribute selector with a qualifying element when "allowWithAttribute" is "true"', function () {
            const source = 'div[foo="bar"] {}';
            const options = {
                allowWithAttribute: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow a class with a qualifying element in a descendant selector', function () {
            const source = '.foo div.bar {}';
            const expected = [{
                column: 9,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow parent selectors when the parent is an element. #106', function () {
            const source = 'a { &.active { color: red; } }';
            const expected = [{
                column: 6,
                line: 1,
                message: 'Class selectors should not include a qualifying element.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow parent selectors when the parent is selector. #118', function () {
            const source = '.a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should inspect the parent selector', function () {
            const source = '.a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                const node = ast.root.first;
                const expected = { startsWith: 'class', endsWith: 'class', hasTag: false };
                let result;

                parser(function (selectors) {
                    node.selectorAst = selectors;
                    result = spec.linter.inspectParent(node.first);
                    expect(result).to.deep.equal(expected);

                }).process(node.selector);
            });
        });

        it('should inspect the parent selector, recognize tag', function () {
            const source = 'a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                const node = ast.root.first;
                const expected = { startsWith: 'tag', endsWith: 'tag', hasTag: true };
                let result;

                parser(function (selectors) {
                    node.selectorAst = selectors;
                    result = spec.linter.inspectParent(node.first);
                    expect(result).to.deep.equal(expected);

                }).process(node.selector);
            });
        });

        it('should inspect the parent selector, recognize tag and class', function () {
            const source = '.b a { &.active { color: red; } }';

            return spec.parse(source, function (ast) {
                const node = ast.root.first;
                const expected = { startsWith: 'class', endsWith: 'tag', hasTag: true };
                let result;

                parser(function (selectors) {
                    node.selectorAst = selectors;
                    result = spec.linter.inspectParent(node.first);
                    expect(result).to.deep.equal(expected);

                }).process(node.selector);
            });
        });
    });
});
