'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#decimalZero()', function () {
        let options;

        it('should have the proper node types', function () {
            const source = 'margin-right: 1.5px;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        describe('when "style" is "leading"', function () {
            beforeEach(function () {
                options = {
                    style: 'leading'
                };
            });

            it('should allow "0.0"', function () {
                const source = 'font-size: 0.0em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow number without decimal zero', function () {
                const source = 'font-size: 1em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow number with leading decimal zero', function () {
                const source = 'font-size: 0.5em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow decimal number greater than 1 without leading zero', function () {
                const source = 'font-size: 1.25em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow number without leading decimal zero', function () {
                const source = 'font-size: .5em;';
                const expected = [{
                    column: 12,
                    line: 1,
                    message: '.5 should be written with leading zero.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow number without leading decimal zero in a function', function () {
                const source = 'color: rgba(0, 0, 0, .5);';
                const expected = [{
                    column: 22,
                    line: 1,
                    message: '.5 should be written with leading zero.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); //"leading"

        describe('when "style" is "trailing"', function () {
            beforeEach(function () {
                options = {
                    style: 'trailing'
                };
            });

            it('should allow "0.0"', function () {
                const source = 'font-size: 0.0em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow number with trailing decimal zero', function () {
                const source = 'font-size: 1.0em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow number without trailing decimal zero', function () {
                const source = 'font-size: 1em;';
                const expected = [{
                    column: 12,
                    line: 1,
                    message: '1 should be written with trailing zero.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); //"trailing"

        describe('when "style" is "both"', function () {
            beforeEach(function () {
                options = {
                    style: 'both'
                };
            });

            it('should allow "0.0"', function () {
                const source = 'font-size: 0.0em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow decimal number less than 1 without trailing zero', function () {
                const source = 'font-size: 0.5em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow decimal number greater than 1 without leading zero', function () {
                const source = 'font-size: 1.5em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow number without leading decimal zero', function () {
                const source = 'font-size: .5em;';
                const expected = [{
                    column: 12,
                    line: 1,
                    message: '.5 should be written with leading and trailing zero.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow number without trailing decimal zero', function () {
                const source = 'font-size: 1em;';
                const expected = [{
                    column: 12,
                    line: 1,
                    message: '1 should be written with leading and trailing zero.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); //"both"

        describe('when "style" is "none"', function () {
            beforeEach(function () {
                options = {
                    style: 'none'
                };
            });

            it('should allow "0.0"', function () {
                const source = 'font-size: 0.0em;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow number with leading decimal zero', function () {
                const source = 'font-size: 0.5em;';
                const expected = [{
                    column: 12,
                    line: 1,
                    message: '0.5 should be written without leading and trailing zero.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow number with trailing decimal zero', function () {
                const source = 'font-size: 1.0em;';
                const expected = [{
                    column: 12,
                    line: 1,
                    message: '1.0 should be written without leading and trailing zero.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow font-weights ending in zero', function () {
                const source = 'font-weight: 300;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });
        }); //"none"

        describe('with invalid "style" value', function () {
            beforeEach(function () {
                options = {
                    style: 'invalid'
                };
            });

            it('should throw an error', function () {
                const source = 'font-size: 1.0em;';

                return spec.parse(source, function (ast) {
                    const lint = spec.linter.lint.bind(null, options, ast.root.first);

                    expect(lint).to.throw(Error);
                });
            });
        }); //"invalid"
    });
});
