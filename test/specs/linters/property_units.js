'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#propertyUnits()', function () {
        it('should have the proper node types', function () {
            const source = 'font-size: 1rem;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow allowed valid unit', function () {
            const source = 'font-size: 1rem;';
            const options = {
                properties: {},
                valid: ['rem']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow valid property unit', function () {
            const source = 'font-size: 1rem;';
            const options = {
                properties: {
                    'font-size': ['rem']
                },
                valid: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow an unspecified unit', function () {
            const source = 'font-size: 1rem;';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Unit "rem" is not allowed for "font-size".'
            }];

            const options = {
                properties: {},
                valid: ['px']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow an unspecified property unit', function () {
            const source = 'font-size: 1rem;';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Unit "rem" is not allowed for "font-size".'
            }];

            const options = {
                properties: {
                    'font-size': ['px']
                },
                valid: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow any units when no valid units are passed', function () {
            const source = 'line-height: 24px;';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Unit "px" is not allowed for "line-height".'
            }];

            const options = {
                properties: {},
                valid: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow any units when no property units are passed', function () {
            const source = 'line-height: 24px;';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Unit "px" is not allowed for "line-height".'
            }];

            const options = {
                properties: {
                    'line-height': []
                },
                valid: ['px']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow percentages when set as a valid unit', function () {
            const source = 'font-size: 100%;';
            const options = {
                properties: {},
                valid: ['%']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow percentages when set as a valid property unit', function () {
            const source = 'font-size: 100%;';
            const options = {
                properties: {
                    'font-size': ['%']
                },
                valid: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow percentages when set as an invalid unit', function () {
            const source = 'font-size: 100%;';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Unit "%" is not allowed for "font-size".'
            }];

            const options = {
                properties: {},
                valid: ['px']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow percentages when set as an invalid property unit', function () {
            const source = 'font-size: 100%;';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Unit "%" is not allowed for "font-size".'
            }];

            const options = {
                properties: {
                    'font-size': ['px']
                },
                valid: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow an invalid unit', function () {
            const source = 'font-size: 1px;';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            const options = {
                invalid: ['px'],
                properties: {}
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow an invalid unit that overrides a valid unit', function () {
            const source = 'font-size: 1px;';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            const options = {
                invalid: ['px'],
                properties: {},
                valid: ['px']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow an invalid unit that has been specified valid for a property', function () {
            const source = 'font-size: 1px;';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            const options = {
                invalid: ['px'],
                properties: {
                    'font-size': ['px']
                }
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not check properties without a unit', function () {
            const source = 'line-height: 1.5;';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should return undefined on variable declaration', function () {
            const source = '@var-name: 12px;';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
