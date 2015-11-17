'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#importPath()', function () {
        it('should allow filename without extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo";';
            var result;
            var ast;

            var options = {
                filenameExtension: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow filename with extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo.less";';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                filenameExtension: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow filename with extension when "filenameExtension" is "true"', function () {
            var source = '@import "foo.less";';
            var result;
            var ast;

            var options = {
                filenameExtension: true,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow filename without extension when "filenameExtension" is "true"', function () {
            var source = '@import "foo";';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo" should include the file extension.'
            }];

            var options = {
                filenameExtension: true,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow filename without leading underscore when "leadingUnderscore" is "false"', function () {
            var source = '@import "foo";';
            var result;
            var ast;

            var options = {
                leadingUnderscore: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow filename with leading underscore when "leadingUnderscore" is "false"', function () {
            var source = '@import "_foo";';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "_foo" should not include a leading underscore.'
            }];

            var options = {
                leadingUnderscore: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow filename with leading underscore when "leadingUnderscore" is "true"', function () {
            var source = '@import "_foo";';
            var result;
            var ast;

            var options = {
                leadingUnderscore: true,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow filename without leading underscore when "leadingUnderscore" is "true"', function () {
            var source = '@import "foo";';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo" should include a leading underscore.'
            }];

            var options = {
                leadingUnderscore: true,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow files with file extension and leading underscore when both options are "false"', function () {
            var source = '@import "_foo.less";';
            var result;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "_foo.less" should not include the file extension.'
            },
            {
                column: 9,
                line: 1,
                message: 'Imported file, "_foo.less" should not include a leading underscore.'
            }];

            var options = {
                filenameExtension: false,
                leadingUnderscore: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow files with file extension and leading underscore when both options are "true"', function () {
            var source = '@import "_foo.less";';
            var result;
            var ast;

            var options = {
                filenameExtension: true,
                leadingUnderscore: true,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should check url imports with quotes', function () {
            var source = '@import url("foo.less");';
            var result;
            var ast;

            var expected = [{
                column: 13,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                filenameExtension: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should check url imports without quotes', function () {
            var source = '@import url(foo.less);';
            var result;
            var ast;

            var expected = [{
                column: 13,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                filenameExtension: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should ignore @import strings containing absolute URLs', function () {
            var source = '@import "http://example.com/foo.css";';
            var result;
            var ast;
            var options = {
                importPath: {
                    filenameExtension: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should ignore @import urls() containing absolute URLs', function () {
            var source = '@import url("http://example.com/foo.css");';
            var result;
            var ast;

            var options = {
                filenameExtension: false,
                exclude: []
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should not report excluded files', function () {
            var source = '@import "foo.less";';
            var result;
            var ast;

            var options = {
                filenameExtension: false,
                exclude: ['foo.less']
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should ignore other at-rules', function () {
            var source = '@charset "UTF-8";';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint({}, ast);

            expect(result).to.equal(null);
        });
    });
});
