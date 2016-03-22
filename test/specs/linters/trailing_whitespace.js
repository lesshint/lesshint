'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#trailingWhitespace()', function () {
        it('should have the proper node types', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.type);
            });
        });

        it('should allow lines with no trailing whitespace', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });

        it('should allow lines with trailing new line characters', function () {
            var source = '.foo {}\n';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow lines with trailing whitespace', function () {
            var source = '.foo {}  ';
            var expected = [{
                column: 9,
                line: 1,
                message: "There should't be any trailing whitespace."
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow lines with trailing tabs', function () {
            var source = '.foo {} \t';
            var expected = [{
                column: 9,
                line: 1,
                message: "There should't be any trailing whitespace."
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore empty files', function () {
            var source = '';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });
    });
});
