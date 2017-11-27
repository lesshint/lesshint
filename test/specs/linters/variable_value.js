'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#variableValue()', function () {
        it('should have the proper node types', function () {
            const source = 'color: #ABC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should ignore if property not in lists', function () {
            const source = 'font-weight: 700;';
            const options = {
                always: ['font-size'],
                never: ['color']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore if no lists', function () {
            const source = 'font-size: #333;';
            const options = {
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow variable if in never list', function () {
            const source = 'color: @app-color;';
            const options = {
                never: ['color']
            };
            const expected = [{
                line: 1,
                column: 8,
                message: 'Variable is not allowed in "color" property.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow non variable if in never list', function () {
            const source = 'color: #333;';
            const options = {
                never: ['color']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow non variable if in always list', function () {
            const source = 'color: #333;';
            const options = {
                always: ['color']
            };
            const expected = [{
                line: 1,
                column: 8,
                message: 'Non variable is not allowed in "color" property.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow variable if in always list', function () {
            const source = 'color: @app-color;';
            const options = {
                always: ['color']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow value if in allowedValues list', function () {
            const source = 'color: none;';
            const options = {
                always: ['color'],
                allowedValues: ['none']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
