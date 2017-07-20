'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#hexValidation()', function () {
        it('should have the proper node types', function () {
            const source = 'color: #AABBCC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow valid hex values', function () {
            const source = 'color: #AABBCC;';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow invalid hex values', function () {
            const source = 'color: #AABBC;';
            const expected = [{
                column: 8,
                line: 1,
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should find invalid hex values in background declarations', function () {
            const source = 'background: url(test.png) no-repeat #AABBC;';
            const expected = [{
                column: 37,
                line: 1,
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow invalid hex values in variable declarations (#28)', function () {
            const source = '@color: #AABBC;';
            const expected = [{
                column: 9,
                line: 1,
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
