'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#importPath()', function () {
        it('should have the proper node types', function () {
            var source = '@import "foo";';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow filename without extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo";';
            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow filename with .css extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo.css";';
            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename with extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo.less";';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename with extension when "filenameExtension" is "true"', function () {
            var source = '@import "foo.less";';
            var options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename without extension when "filenameExtension" is "true"', function () {
            var source = '@import "foo";';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo" should include the file extension.'
            }];

            var options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename without leading underscore when "leadingUnderscore" is "false"', function () {
            var source = '@import "foo";';
            var options = {
                leadingUnderscore: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename with leading underscore when "leadingUnderscore" is "false"', function () {
            var source = '@import "_foo";';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "_foo" should not include a leading underscore.'
            }];

            var options = {
                leadingUnderscore: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename with leading underscore when "leadingUnderscore" is "true"', function () {
            var source = '@import "_foo";';
            var options = {
                leadingUnderscore: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename without leading underscore when "leadingUnderscore" is "true"', function () {
            var source = '@import "foo";';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo" should include a leading underscore.'
            }];

            var options = {
                leadingUnderscore: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow files with file extension and leading underscore when both options are "false"', function () {
            var source = '@import "_foo.less";';
            var expected = [
                {
                    column: 9,
                    line: 1,
                    message: 'Imported file, "_foo.less" should not include the file extension.'
                },
                {
                    column: 9,
                    line: 1,
                    message: 'Imported file, "_foo.less" should not include a leading underscore.'
                }
            ];

            var options = {
                filenameExtension: false,
                leadingUnderscore: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow files with file extension and leading underscore when both options are "true"', function () {
            var source = '@import "_foo.less";';
            var options = {
                filenameExtension: true,
                leadingUnderscore: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check url imports with quotes', function () {
            var source = '@import url("foo.less");';
            var expected = [{
                column: 13,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check url imports without quotes', function () {
            var source = '@import url(foo.less);';
            var expected = [{
                column: 13,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore @import strings containing absolute URLs', function () {
            var source = '@import "http://example.com/foo.css";';
            var options = {
                importPath: {
                    filenameExtension: false,
                    exclude: []
                }
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore @import urls() containing absolute URLs', function () {
            var source = '@import url("http://example.com/foo.css");';
            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report excluded files', function () {
            var source = '@import "foo.less";';
            var options = {
                filenameExtension: false,
                exclude: ['foo.less']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore other at-rules', function () {
            var source = '@charset "UTF-8";';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });

    describe('#importPath() with Import Option', function () {

        it('should allow filename without extension when "filenameExtension" is "false"', function () {
            var source = '@import (css) "foo";';
            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow filename with .css extension when "filenameExtension" is "false"', function () {
            var source = '@import (inline) "foo.css";';
            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename with extension when "filenameExtension" is "false"', function () {
            var source = '@import (inline) "foo.less";';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename with extension when "filenameExtension" is "true"', function () {
            var source = '@import (inline) "foo.less";';
            var options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename without extension when "filenameExtension" is "true"', function () {
            var source = '@import (inline) "foo";';
            var expected = [{
                column: 9,
                line: 1,
                message: 'Imported file, "foo" should include the file extension.'
            }];

            var options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
