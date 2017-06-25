'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#stringQuotes()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { color: #fff; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow single quotes when "style" is "single"', function () {
            const source = ".foo { content: 'Hello world'; }";
            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow double quotes when "style" is "single"', function () {
            const source = '.foo { content: "Hello world"; }';
            const expected = [{
                column: 17,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow double quotes when "style" is "double"', function () {
            const source = '.foo { content: "Hello world"; }';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes when "style" is "double"', function () {
            const source = ".foo { content: 'Hello world'; }";
            const expected = [{
                column: 17,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should handle quotes in functions', function () {
            const source = ".foo { background-image: url('img/image.jpg'); }";
            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes in functions when style is "double"', function () {
            const source = ".foo { background-image: url('img/image.jpg'); }";
            const options = {
                style: 'double'
            };
            const expected = [{
                column: 30,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should handle concatenated strings', function () {
            const source = ".foo { content: ' (' attr(id) ')'; }";
            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes in variable declarations when "style" is "single"', function () {
            const source = "@foo: 'Hello world';";
            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow double quotes in variable declarations when "style" is "single"', function () {
            const source = '@foo: "Hello world";';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow double quotes in variable declarations when "style" is "double"', function () {
            const source = '@foo: "Hello world";';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes in variable declarations when "style" is "double"', function () {
            const source = "@foo: 'Hello world';";
            const expected = [{
                column: 7,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow single quotes in attribute selectors when "style" is "single"', function () {
            const source = "input[type='text'] {}";
            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow double quotes in attribute selectors when "style" is "single"', function () {
            const source = 'input[type="text"] {}';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow double quotes in attribute selectors when "style" is "double"', function () {
            const source = 'input[type="text"] {}';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes in attribute selectors when "style" is "double"', function () {
            const source = "input[type='text'] {}";
            const expected = [{
                column: 12,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow double quotes in @import-rules when "style" is "single"', function () {
            const source = '@import "foo.less";';
            const expected = [{
                column: 9,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow single quotes in @import-rules when "style" is "double"', function () {
            const source = "@import 'foo.less';";
            const expected = [{
                column: 9,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow single quotes in @import-rules when "style" is "single"', function () {
            const source = "@import 'foo.less';";
            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should allow double quotes in @import-rules when "style" is "double"', function () {
            const source = '@import "foo.less";';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should not allow double quotes in @-rules when "style" is "single"', function () {
            const source = '@charset "utf-8";';
            const expected = [{
                column: 10,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow single quotes in @-rules when "style" is "double"', function () {
            const source = "@charset 'utf-8';";
            const expected = [{
                column: 10,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow single quotes in @-rules when "style" is "single"', function () {
            const source = "@charset 'utf-8';";
            const options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should allow double quotes in @-rules when "style" is "double"', function () {
            const source = '@charset "utf-8";';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should not check irrelevant @-rules', function () {
            const source = '@media (screen) {}';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should not check @-rules without strings', function () {
            const source = '@var: 16px;';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should not warn on variables with a lot of spaces. #260', function () {
            const source = '@var      :       16px;';
            const options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            const source = ".foo { content: 'Hello world' }";
            const options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                const lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
