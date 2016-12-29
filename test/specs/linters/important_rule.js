'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#importantRule()', function () {
        it('should have the proper node types', function () {
            const source = 'color: red;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not do anything when there is no !important present', function () {
            const source = 'color: red;';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow !important', function () {
            const source = 'color: red !important;';
            const expected = [{
                column: 12,
                line: 1,
                message: '!important should not be used.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
