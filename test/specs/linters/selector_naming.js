'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#selectorNaming()', function () {
        it('should have the proper node types', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should skip selector without name', function () {
            const source = '[type="text"] {}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check for lowercase', function () {
            const source = '.fooBar {}';
            const expected = [{
                column: 1,
                line: 1,
                message: 'Selector "fooBar" should follow naming conventions.'
            }];

            const options = {
                disallowUppercase: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check for underscore', function () {
            const source = '.foo_bar {}';
            const expected = [{
                column: 1,
                line: 1,
                message: 'Selector "foo_bar" should follow naming conventions.'
            }];

            const options = {
                disallowUnderscore: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check for dash', function () {
            const source = '.foo-bar {}';
            const expected = [{
                column: 1,
                line: 1,
                message: 'Selector "foo-bar" should follow naming conventions.'
            }];
            const options = {
                disallowDash: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow exceptions with exclude', function () {
            const source = '.foo-bar {}';
            const options = {
                disallowDash: true,
                exclude: ['foo-bar']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle approximate "camelCase" style', function () {
            const source = '.foo-bar {}';
            const expected = [{
                column: 1,
                line: 1,
                message: 'Selector "foo-bar" should follow naming conventions.'
            }];

            const options = {
                disallowDash: true,
                disallowUnderscore: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should handle approximate "snake_case" style', function () {
            const source = '.fooBar {}';
            const expected = [{
                column: 1,
                line: 1,
                message: 'Selector "fooBar" should follow naming conventions.'
            }];

            const options = {
                disallowDash: true,
                disallowUppercase: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should report the correct line', function () {
            const source = [
                '.Foo,',
                '.Bar {}'
            ].join('\n');

            const expected = [{
                column: 1,
                line: 1,
                message: 'Selector "Foo" should follow naming conventions.'
            },
            {
                column: 1,
                line: 2,
                message: 'Selector "Bar" should follow naming conventions.'
            }];

            const options = {
                disallowUppercase: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
