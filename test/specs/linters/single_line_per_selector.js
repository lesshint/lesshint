'use strict';

const { expect } = require('chai');
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#singleLinePerSelector()', function () {
        it('should have the proper node types', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow selectors on separate lines', function () {
            const source = '.foo, \n.bar {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow multiple selectors on the same line', function () {
            const source = '.foo, .bar {}';
            const expected = [
                {
                    column: 7,
                    line: 1,
                    message: 'Each selector should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow the comma on a new line', function () {
            const source = '.foo\n,.bar {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow selectors with short names on the same line when "style" is "18f"', function () {
            const source = '.foo, .bar {}';
            const options = {
                style: '18f'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow selectors with long names on the same line when "style" is "18f"', function () {
            const source = '.foobar, .bar, {}';
            const options = {
                style: '18f'
            };

            const expected = [{
                column: 10,
                line: 1,
                message: 'Each selector should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not report single selectors', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should warn on selectors without an accompanying newline. #346', function () {
            const source = '.aaa, .bbb,\n.ccc {}';

            const expected = [{
                column: 7,
                line: 1,
                message: 'Each selector should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not report selectors with sub-selectors. #466', function () {
            const source = '.foo + .foo,\n.bar {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
