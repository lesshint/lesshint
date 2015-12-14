'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#selectorNaming()', function () {
        var result;
        var ast;
        var options;

        it('should skip selector without name', function () {
            ast = parseAST('[type="text"] {}');
            ast = ast.first().first('selector');
            result = linter.lint(options, ast);
            expect(result).to.be.undefined;
        });

        it('should check for lowercase', function () {
            options = {
                disallowUppercase: true
            };

            ast = parseAST('.fooBar {}');
            ast = ast.first().first('selector');
            result = linter.lint(options, ast);
            expect(result.length).to.equal(1);
        });

        it('should check for underscore', function () {
            options = {
                disallowUnderscore: true
            };

            ast = parseAST('.foo_bar {}');
            ast = ast.first().first('selector');
            result = linter.lint(options, ast);
            expect(result.length).to.equal(1);
        });

        it('should check for dash', function () {
            options = {
                disallowDash: true
            };

            ast = parseAST('.foo-bar {}');
            ast = ast.first().first('selector');
            result = linter.lint(options, ast);
            expect(result.length).to.equal(1);
        });

        it('should allow exceptions with exclude', function () {
            options = {
                disallowDash: true,
                exclude: ['foo-bar']
            };

            ast = parseAST('.foo-bar {}');
            ast = ast.first().first('selector');
            result = linter.lint(options, ast);
            expect(result).to.be.undefined;
        });

        describe('combinations', function () {
            it('should approximate "camelCase" style', function () {
                options = {
                    disallowDash: true,
                    disallowUnderscore: true
                };

                ast = parseAST('.foo-bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result.length).to.equal(1);

                ast = parseAST('.foo_bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result.length).to.equal(1);

                ast = parseAST('.fooBar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result).to.be.undefined;

                ast = parseAST('.FooBar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result).to.be.undefined;
            });

            it('should approximate "snake_case" style', function () {
                options = {
                    disallowDash: true
                };

                ast = parseAST('.foo-bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result.length).to.equal(1);

                ast = parseAST('.foo_bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result).to.be.undefined;

                options = {
                    disallowDash: true,
                    disallowUppercase: true
                };

                ast = parseAST('.foo_Bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result.length).to.equal(1);

                ast = parseAST('.foo_bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result).to.be.undefined;
            });

            it('should approximate "train-case" style', function () {
                options = {
                    disallowDash: true
                };

                ast = parseAST('.foo-bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result.length).to.equal(1);

                ast = parseAST('.foo_bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result).to.be.undefined;

                options = {
                    disallowDash: true,
                    disallowUppercase: true
                };

                ast = parseAST('.foo_Bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result.length).to.equal(1);

                ast = parseAST('.foo_bar {}');
                ast = ast.first().first('selector');
                result = linter.lint(options, ast);
                expect(result).to.be.undefined;
            });
        });
    });
});
