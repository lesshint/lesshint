'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAroundBang', function () {
        let options;

        it('should have the proper node types', function () {
            const source = 'color: red !important;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        describe('when "style" is "after"', function () {
            beforeEach(function () {
                options = {
                    style: 'after'
                };
            });

            it('should allow one space after bang', function () {
                const source = 'color: red! important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after comma', function () {
                const source = 'color: red !important;';
                const expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Exclamation marks should be followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space after bang in mixins', function () {
                const source = '.mixin()! important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after bang in mixins', function () {
                const source = '.mixin()!important;';
                const expected = [{
                    column: 9,
                    line: 1,
                    message: 'Exclamation marks should be followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "after"

        describe('when "style" is "before"', function () {
            beforeEach(function () {
                options = {
                    style: 'before'
                };
            });

            it('should allow one space before bang', function () {
                const source = 'color: red !important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before bang', function () {
                const source = 'color: red!important;';
                const expected = [
                    {
                        column: 11,
                        line: 1,
                        message: 'Exclamation marks should be preceded by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space before bang in mixins', function () {
                const source = '.mixin() !important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before bang in mixins', function () {
                const source = '.mixin()!important;';
                const expected = [{
                    column: 9,
                    line: 1,
                    message: 'Exclamation marks should be preceded by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "before"

        describe('when "style" is "both"', function () {
            beforeEach(function () {
                options = {
                    style: 'both'
                };
            });

            it('should allow one space before and after bang', function () {
                const source = 'color: red ! important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before bang', function () {
                const source = 'color: red! important;';
                const expected = [
                    {
                        column: 11,
                        line: 1,
                        message: 'Exclamation marks should be preceded and followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after bang', function () {
                const source = 'color: red !important;';
                const expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Exclamation marks should be preceded and followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space before and after comma', function () {
                const source = 'color: red!important;';
                const expected = [
                    {
                        column: 11,
                        line: 1,
                        message: 'Exclamation marks should be preceded and followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space before and after bang in mixins', function () {
                const source = '.mixin() ! important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before bang in mixins', function () {
                const source = '.mixin()! important;';
                const expected = [{
                    column: 9,
                    line: 1,
                    message: 'Exclamation marks should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after bang in mixins', function () {
                const source = '.mixin() !important;';
                const expected = [{
                    column: 10,
                    line: 1,
                    message: 'Exclamation marks should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "both"

        describe('when "style" is "none"', function () {
            beforeEach(function () {
                options = {
                    style: 'none'
                };
            });

            it('should allow a missing space after bang', function () {
                const source = 'color: red!important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after bang', function () {
                const source = 'color: red! important;';
                const expected = [
                    {
                        column: 11,
                        line: 1,
                        message: 'Exclamation marks should not be preceded nor followed by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before comma', function () {
                const source = 'color: red !important;';
                const expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Exclamation marks should not be preceded nor followed by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before and after comma', function () {
                const source = 'color: red ! important;';
                const expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Exclamation marks should not be preceded nor followed by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow a missing space after bang in mixins', function () {
                const source = '.mixin()!important;';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after bang in mixins', function () {
                const source = '.mixin()! important;';
                const expected = [{
                    column: 9,
                    line: 1,
                    message: 'Exclamation marks should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before bang in mixins', function () {
                const source = '.mixin() !important;';
                const expected = [{
                    column: 10,
                    line: 1,
                    message: 'Exclamation marks should not be preceded nor followed by any space.'
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
                const source = 'color: red !important;';

                return spec.parse(source, function (ast) {
                    const node = ast.root.first;
                    const lint = spec.linter.lint.bind(null, options, node);

                    expect(lint).to.throw(Error);
                });
            });
        }); // "invalid"
    });
});
