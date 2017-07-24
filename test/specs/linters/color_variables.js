'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#colorVariables()', function () {
        it('should have the proper node types', function () {
            const source = 'color: #ABC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow hex values', function () {
            const source = 'color: #ABC;';
            const expected = [{
                column: 8,
                line: 1,
                message: '#ABC should be replaced with an existing variable.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow hex values when assigned to a variable', function () {
            const source = '@myvariable: #ABC;';
            const expected = undefined;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should should find hex values in multi part declarations', function () {
            const source = 'border: 1px solid #ABC;';
            const expected = [{
                column: 19,
                line: 1,
                message: '#ABC should be replaced with an existing variable.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
