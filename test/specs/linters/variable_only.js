'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#variableOnly()', function () {
        it('should have the proper node types', function () {
            const source = 'color: #ABC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should ignore if rule disabled', function () {
            const source = 'color: #333;';
            const options = {
                enabled: false,
                properties: ['color']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore if property not for lint', function () {
            const source = 'color: #333;';
            const options = {
                enabled: true,
                properties: ['font-size']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow non variable value', function () {
            const source = 'color: #333;';
            const options = {
                enabled: true,
                properties: ['color']
            };
            const expected = [{
                line: 1,
                column: 8,
                message: 'The value of [color] must be a variable.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow variable value', function () {
            const source = 'color: @app-color;';
            const options = {
                enabled: true,
                properties: ['color']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
