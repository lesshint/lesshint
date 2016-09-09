'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#singleLinePerSelector()', function () {
        it('should have the proper node types', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow selectors on separate lines', function () {
            var source = '.foo, \n.bar {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow multiple selectors on the same line', function () {
            var source = '.foo, .bar {}';
            var expected = [
                {
                    column: 1,
                    line: 1,
                    message: 'Each selector should be on its own line.'
                },
                {
                    column: 7,
                    line: 1,
                    message: 'Each selector should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow the comma on a new line', function () {
            var source = '.foo\n,.bar {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow selectors with short names on the same line when "style" is "18f"', function () {
            var source = '.foo, .bar {}';
            var options = {
                style: '18f'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow selectors with long names on the same line when "style" is "18f"', function () {
            var source = '.foobar, .bar {}';
            var options = {
                style: '18f'
            };

            var expected = [{
                column: 10,
                line: 1,
                message: 'Each selector should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not report single selectors', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report the same selector multiple times. #239', function () {
            var source = '.foo .bar, .bar .foo {}';
            var expected = [
                {
                    column: 1,
                    line: 1,
                    message: 'Each selector should be on its own line.'
                },
                {
                    column: 12,
                    line: 1,
                    message: 'Each selector should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
