'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAroundOperator', function () {
        let options;

        it('should have the proper node types', function () {
            const source = 'height: calc(10px + 10px);';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        describe('when "style" is "both"', function () {
            beforeEach(function () {
                options = {
                    style: 'both'
                };
            });

            it('should allow one space before and after operator', function () {
                const source = 'height: calc(10px + 10px);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before operator', function () {
                const source = 'height: calc(10px+ 10px);';
                const expected = [{
                    column: 18,
                    line: 1,
                    message: 'Operators should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after operator', function () {
                const source = 'height: calc(10px +10px);';
                const expected = [{
                    column: 19,
                    line: 1,
                    message: 'Operators should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space before and after operator', function () {
                const source = 'height: calc(10px+10px);';
                const expected = [{
                    column: 18,
                    line: 1,
                    message: 'Operators should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not report on negative values', function () {
                const source = 'margin-left: -10px;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative values before a (', function () {
                const source = 'margin-left: -(10px);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative values in shorthands', function () {
                const source = 'margin: -10px -1px 0px 20px;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative number at the end of the value', function () {
                const source = '@foo: (@bar / 3) * -1;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative number at the end of brackets', function () {
                const source = '@b: spin(@a, -2%);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative variables. See #179', function () {
                const source = 'margin-left: -@foo;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on font-size/line-height shorthand declaration', function () {
                const source = 'font: 12px/1.5 Arial;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on browser-prefixed functions', function () {
                const source = 'background: -webkit-linear-gradient(0);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });
        }); // "both"

        describe('when "style" is "none"', function () {
            beforeEach(function () {
                options = {
                    style: 'none'
                };
            });

            it('should allow missing space before and after operator', function () {
                const source = 'height: calc(10px+10px);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space before operator', function () {
                const source = 'height: calc(10px +10px);';
                const expected = [{
                    column: 19,
                    line: 1,
                    message: 'Operators should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space after operator', function () {
                const source = 'height: calc(10px+ 10px);';
                const expected = [{
                    column: 18,
                    line: 1,
                    message: 'Operators should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow a space after operator in shorthand values', function () {
                const source = 'margin: 10px - 1px 0px 20px;';
                const expected = [{
                    column: 14,
                    line: 1,
                    message: 'Operators should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "none"

        describe('with invalid "style" value', function () {
            beforeEach(function () {
                options = {
                    style: 'invalid'
                };
            });

            it('should throw an error', function () {
                const source = 'height: calc(10px+10px);';

                return spec.parse(source, function (ast) {
                    const node = ast.root.first;
                    const lint = spec.linter.lint.bind(null, options, node);

                    expect(lint).to.throw(Error);
                });
            });
        }); // "invalid"
    });
});
