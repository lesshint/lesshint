'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#selectorNaming()', function () {
        it('should have the proper node types', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should skip selector without name', function () {
            var source = '[type="text"] {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check for lowercase', function () {
            var source = '.fooBar {}';
            var expected = [{
                column: 1,
                line: 1,
                message: 'Selector "fooBar" should follow naming conventions.'
            }];

            var options = {
                disallowUppercase: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check for underscore', function () {
            var source = '.foo_bar {}';
            var expected = [{
                column: 1,
                line: 1,
                message: 'Selector "foo_bar" should follow naming conventions.'
            }];

            var options = {
                disallowUnderscore: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check for dash', function () {
            var source = '.foo-bar {}';
            var expected = [{
                column: 1,
                line: 1,
                message: 'Selector "foo-bar" should follow naming conventions.'
            }];
            var options = {
                disallowDash: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow exceptions with exclude', function () {
            var source = '.foo-bar {}';
            var options = {
                disallowDash: true,
                exclude: ['foo-bar']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle approximate "camelCase" style', function () {
            var source = '.foo-bar {}';
            var expected = [{
                column: 1,
                line: 1,
                message: 'Selector "foo-bar" should follow naming conventions.'
            }];

            var options = {
                disallowDash: true,
                disallowUnderscore: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should handle approximate "snake_case" style', function () {
            var source = '.fooBar {}';
            var expected = [{
                column: 1,
                line: 1,
                message: 'Selector "fooBar" should follow naming conventions.'
            }];

            var options = {
                disallowDash: true,
                disallowUppercase: true
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
