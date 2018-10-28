'use strict';

const { expect } = require('chai');
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#pseudoElements()', function () {
        it('should allow simple selectors', function () {
            const source = '.foo {}';
            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        describe('with pseudo-elements', function () {
            const elements = [
                'after',
                'backdrop',
                'before',
                'cue',
                'first-letter',
                'first-line',
                'grammar-error',
                'marker',
                'placeholder',
                'selection',
                'slotted',
                'spelling-error',
            ];

            it('should have the proper node types', function () {
                const source = '.foo::before {}';

                return spec.parse(source, function (ast) {
                    expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
                });
            });

            elements.forEach((element) => {
                it('should allow ::' + element, function () {
                    const source = '.foo::' + element + ' {}';

                    return spec.parse(source, function (ast) {
                        const result = spec.linter.lint({}, ast.root.first);

                        expect(result).to.be.undefined;
                    });
                });
            });

            it('should not allow incorrect number of colons', function () {
                const source = '.foo:before {}';
                const expected = [{
                    column: 5,
                    line: 1,
                    message: 'Pseudo-elements should have 2 colons.'
                }];

                const options = {};

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        });

        describe('with pseudo-classes', function () {
            it('should have the proper node types', function () {
                const source = '.foo:hover {}';

                return spec.parse(source, function (ast) {
                    expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
                });
            });

            it('should allow pseudo-classes', function () {
                const source = '.foo:hover {}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint({}, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow incorrect number of colons', function () {
                const source = '.foo::hover {}';
                const expected = [{
                    column: 5,
                    line: 1,
                    message: 'Pseudo-classes should have 1 colon.'
                }];

                const options = {};

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should report all errors at once', function () {
                const source = '.foo::hover, .foo::focus {}';
                const expected = [{
                    column: 5,
                    line: 1,
                    message: 'Pseudo-classes should have 1 colon.'
                }, {
                    column: 18,
                    line: 1,
                    message: 'Pseudo-classes should have 1 colon.'
                }];

                const options = {};

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        });

        describe('with both', function () {
            it('should report both if chained', function () {
                const source = '.foo:before::hover {}';
                const expected = [{
                    column: 5,
                    line: 1,
                    message: 'Pseudo-elements should have 2 colons.'
                }, {
                    column: 12,
                    line: 1,
                    message: 'Pseudo-classes should have 1 colon.'
                }];

                const options = {};

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should exclude configurable "pseudo"', function () {
                const source = '.foo:bar::baz {}';
                const config = {
                    exclude: [
                        'bar',
                        'baz',
                    ],
                };

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(config, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });
        });
    });
});
