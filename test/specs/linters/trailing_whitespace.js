'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#trailingWhitespace()', function () {
        it('should have the proper node types', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.type);
            });
        });

        it('should allow lines with no trailing whitespace', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });

        it('should allow lines with trailing new line characters', function () {
            const source = '.foo {}\n';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow lines with trailing whitespace', function () {
            const source = '.foo {}  ';
            const expected = [{
                column: 9,
                line: 1,
                message: "There shouldn't be any trailing whitespace."
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow lines with trailing tabs', function () {
            const source = '.foo {} \t';
            const expected = [{
                column: 9,
                line: 1,
                message: "There shouldn't be any trailing whitespace."
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore empty files', function () {
            const source = '';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });
    });
});
