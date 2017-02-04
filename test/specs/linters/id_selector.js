'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#idSelector()', function () {
        it('should have the proper node types', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow selectors without IDs', function () {
            const source = '.foo {}';
            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow IDs in selectors', function () {
            const source = '.foo #bar {}';
            const expected = [{
                column: 6,
                line: 1,
                message: 'Selectors should not use IDs.'
            }];

            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow IDs in multiple selectors for a rule', function () {
            const source = [
                '.foo #bar,',
                '.baz #qux {}'
            ].join('\n');

            const expected = [
                {
                    column: 6,
                    line: 1,
                    message: 'Selectors should not use IDs.'
                },
                {
                    column: 6,
                    line: 2,
                    message: 'Selectors should not use IDs.'
                }
            ];

            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow excluded IDs', function () {
            const source = '#foo {}';
            const options = {
                exclude: ['foo']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow excluded IDs defined with #', function () {
            const source = '#foo {}';
            const options = {
                exclude: ['#foo']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow IDs that are not excluded', function () {
            const source = '.foo #bar {}';
            const expected = [{
                column: 6,
                line: 1,
                message: 'Selectors should not use IDs.'
            }];

            const options = {
                exclude: ['foo']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
