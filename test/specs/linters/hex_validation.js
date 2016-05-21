'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#hexValidation()', function () {
        it('should have the proper node types', function () {
            var source = 'color: #AABBCC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow valid hex values', function () {
            var source = 'color: #AABBCC;';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow invalid hex values', function () {
            var source = 'color: #AABBC;';
            var expected = [{
                column: 8,
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should find invalid hex values in background declarations', function () {
            var source = 'background: url(test.png) no-repeat #AABBC;';
            var expected = [{
                column: 37,
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow invalid hex values in variable declarations (#28)', function () {
            var source = '@color: #AABBC;';
            var expected = [{
                column: 9,
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
