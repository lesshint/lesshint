'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#stringQuotes()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { color: #fff; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow single quotes when "style" is "single"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow double quotes when "style" is "single"', function () {
            var source = '.foo { content: "Hello world"; }';
            var expected = [{
                column: 17,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow double quotes when "style" is "double"', function () {
            var source = '.foo { content: "Hello world"; }';
            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes when "style" is "double"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var expected = [{
                column: 17,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should handle quotes in functions', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes in functions when style is "double"', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var options = {
                style: 'double'
            };
            var expected = [{
                column: 30,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should handle concatenated strings', function () {
            var source = ".foo { content: ' (' attr(id) ')'; }";
            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes in variable declarations when "style" is "single"', function () {
            var source = "@foo: 'Hello world';";
            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow double quotes in variable declarations when "style" is "single"', function () {
            var source = '@foo: "Hello world";';
            var expected = [{
                column: 7,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow double quotes in variable declarations when "style" is "double"', function () {
            var source = '@foo: "Hello world";';
            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes in variable declarations when "style" is "double"', function () {
            var source = "@foo: 'Hello world';";
            var expected = [{
                column: 7,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow single quotes in attribute selectors when "style" is "single"', function () {
            var source = "input[type='text'] {}";
            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow double quotes in attribute selectors when "style" is "single"', function () {
            var source = 'input[type="text"] {}';
            var expected = [{
                column: 12,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow double quotes in attribute selectors when "style" is "double"', function () {
            var source = 'input[type="text"] {}';
            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single quotes in attribute selectors when "style" is "double"', function () {
            var source = "input[type='text'] {}";
            var expected = [{
                column: 12,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow double quotes in @-rules when "style" is "single"', function () {
            var source = '@import "foo.less";';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Strings should use single quotes.'
            }];

            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow single quotes in @-rules when "style" is "double"', function () {
            var source = "@import 'foo.less';";
            var expected = [{
                column: 9,
                line: 1,
                message: 'Strings should use double quotes.'
            }];

            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow single quotes in @-rules when "style" is "single"', function () {
            var source = "@import 'foo.less';";
            var options = {
                style: 'single'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should allow double quotes in @-rules when "style" is "double"', function () {
            var source = '@import "foo.less";';
            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should not check irrelevant @-rules', function () {
            var source = '@media (screen) {}';
            var options = {
                style: 'double'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            var source = ".foo { content: 'Hello world' }";
            var options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                var lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
