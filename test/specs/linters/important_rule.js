'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#importantRule()', function () {
        it('should have the proper node types', function () {
            var source = 'color: red;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not do anything when there is no !important present', function () {
            var source = 'color: red;';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow !important', function () {
            var source = 'color: red !important;';
            var expected = [{
                column: 12,
                line: 1,
                message: '!important should not be used.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
