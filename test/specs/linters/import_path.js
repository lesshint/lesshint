'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#importPath()', function () {
        it('should have the proper node types', function () {
            const source = '@import "foo";';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow filename without extension when "filenameExtension" is "false"', function () {
            const source = '@import "foo";';
            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow filename with .css extension when "filenameExtension" is "false"', function () {
            const source = '@import "foo.css";';
            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename with extension when "filenameExtension" is "false"', function () {
            const source = '@import "foo.less";';
            const expected = [{
                column: 10,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename with extension when "filenameExtension" is "true"', function () {
            const source = '@import "foo.less";';
            const options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename without extension when "filenameExtension" is "true"', function () {
            const source = '@import "foo";';
            const expected = [{
                column: 10,
                line: 1,
                message: 'Imported file, "foo" should include the file extension.'
            }];

            const options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename without leading underscore when "leadingUnderscore" is "false"', function () {
            const source = '@import "foo";';
            const options = {
                leadingUnderscore: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename with leading underscore when "leadingUnderscore" is "false"', function () {
            const source = '@import "_foo";';
            const expected = [{
                column: 10,
                line: 1,
                message: 'Imported file, "_foo" should not include a leading underscore.'
            }];

            const options = {
                leadingUnderscore: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename with leading underscore when "leadingUnderscore" is "true"', function () {
            const source = '@import "_foo";';
            const options = {
                leadingUnderscore: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename without leading underscore when "leadingUnderscore" is "true"', function () {
            const source = '@import "foo";';
            const expected = [{
                column: 10,
                line: 1,
                message: 'Imported file, "foo" should include a leading underscore.'
            }];

            const options = {
                leadingUnderscore: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow files with file extension and leading underscore when both options are "false"', function () {
            const source = '@import "_foo.less";';
            const expected = [
                {
                    column: 10,
                    line: 1,
                    message: 'Imported file, "_foo.less" should not include the file extension.'
                },
                {
                    column: 10,
                    line: 1,
                    message: 'Imported file, "_foo.less" should not include a leading underscore.'
                }
            ];

            const options = {
                filenameExtension: false,
                leadingUnderscore: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow files with file extension and leading underscore when both options are "true"', function () {
            const source = '@import "_foo.less";';
            const options = {
                filenameExtension: true,
                leadingUnderscore: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check url imports with quotes', function () {
            const source = '@import url("foo.less");';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check url imports without quotes', function () {
            const source = '@import url(foo.less);';
            const expected = [{
                column: 13,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore @import strings containing absolute URLs', function () {
            const source = '@import "http://example.com/foo.css";';
            const options = {
                importPath: {
                    filenameExtension: false,
                    exclude: []
                }
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore @import urls() containing absolute URLs', function () {
            const source = '@import url("http://example.com/foo.css");';
            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report excluded files', function () {
            const source = '@import "foo.less";';
            const options = {
                filenameExtension: false,
                exclude: ['foo.less']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });

    describe('#importPath() with Import Option', function () {

        it('should allow filename without extension when "filenameExtension" is "false"', function () {
            const source = '@import (css) "foo";';
            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow filename with .css extension when "filenameExtension" is "false"', function () {
            const source = '@import (inline) "foo.css";';
            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename with extension when "filenameExtension" is "false"', function () {
            const source = '@import (inline) "foo.less";';
            const expected = [{
                column: 19,
                line: 1,
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            const options = {
                filenameExtension: false,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow filename with extension when "filenameExtension" is "true"', function () {
            const source = '@import (inline) "foo.less";';
            const options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow filename without extension when "filenameExtension" is "true"', function () {
            const source = '@import (inline) "foo";';
            const expected = [{
                column: 19,
                line: 1,
                message: 'Imported file, "foo" should include the file extension.'
            }];

            const options = {
                filenameExtension: true,
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
