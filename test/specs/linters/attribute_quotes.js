'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#attributeQuotes()', function () {
        it('should have the proper node types', function () {
            const source = 'input[type="text"] {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should bail if the node has no selector', function () {
            const source = "input[type='text'] { width: 0; }";

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes', function () {
            const source = "input[type='text'] {}";

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow double quotes', function () {
            const source = 'input[type="text"] {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing quotes', function () {
            const source = 'input[type=text] {}';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Attribute selectors should use quotes.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not check attribute selectors without an operator', function () {
            const source = 'input[required] {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check selectors without attributes', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check all selectors in a selector group', function () {
            const source = [
                'input[type=text],',
                'input[type=text] {}'
            ].join('\n');

            const expected = [
                {
                    column: 12,
                    line: 1,
                    message: 'Attribute selectors should use quotes.'
                },
                {
                    column: 12,
                    line: 2,
                    message: 'Attribute selectors should use quotes.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
