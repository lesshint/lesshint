'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#universalSelector()', function () {
        it('should have the proper node types', function () {
            const source = '* {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow non-universal selectors', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow universal selectors', function () {
            const source = '.foo * {}';
            const expected = [{
                column: 6,
                line: 1,
                message: "The universal selector shouldn't be used."
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow universal selectors in multiple selectors for a rule', function () {
            const source = '.foo *, .baz * {}';
            const expected = [
                {
                    column: 6,
                    line: 1,
                    message: "The universal selector shouldn't be used."
                },
                {
                    column: 14,
                    line: 1,
                    message: "The universal selector shouldn't be used."
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
    });
});
