'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#idSelector()', function () {
        it('should have the proper node types', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow selectors without IDs', function () {
            var source = '.foo {}';
            var options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow IDs in selectors', function () {
            var source = '.foo #bar {}';
            var expected = [{
                column: 6,
                line: 1,
                message: 'Selectors should not use IDs.'
            }];

            var options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow IDs in multiple selectors for a rule', function () {
            var source = '.foo #bar, .baz #qux {}';
            var expected = [
                {
                    column: 6,
                    line: 1,
                    message: 'Selectors should not use IDs.'
                },
                {
                    column: 17,
                    line: 1,
                    message: 'Selectors should not use IDs.'
                }
            ];

            var options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow excluded IDs', function () {
            var source = '#foo {}';
            var options = {
                exclude: ['foo']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow excluded IDs defined with #', function () {
            var source = '#foo {}';
            var options = {
                exclude: ['#foo']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow IDs that are not excluded', function () {
            var source = '.foo #bar {}';
            var expected = [{
                column: 6,
                line: 1,
                message: 'Selectors should not use IDs.'
            }];

            var options = {
                exclude: ['foo']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
