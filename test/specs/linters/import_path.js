'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#importPath()', function () {
        it('should allow filename without extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo";';
            var ast;

            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow filename with extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo.less";';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow filename with extension when "filenameExtension" is "true"', function () {
            var source = '@import "foo.less";';
            var ast;

            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow filename without extension when "filenameExtension" is "true"', function () {
            var source = '@import "foo";';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "foo" should include the file extension.'
            }];

            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow filename without leading underscore when "leadingUnderscore" is "false"', function () {
            var source = '@import "foo";';
            var ast;

            var options = {
                importPath: {
                    enabled: true,
                    leadingUnderscore: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow filename with leading underscore when "leadingUnderscore" is "false"', function () {
            var source = '@import "_foo";';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "_foo" should not include a leading underscore.'
            }];

            var options = {
                importPath: {
                    enabled: true,
                    leadingUnderscore: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow filename with leading underscore when "leadingUnderscore" is "true"', function () {
            var source = '@import "_foo";';
            var ast;

            var options = {
                importPath: {
                    enabled: true,
                    leadingUnderscore: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow filename without leading underscore when "leadingUnderscore" is "true"', function () {
            var source = '@import "foo";';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "foo" should include a leading underscore.'
            }];

            var options = {
                importPath: {
                    enabled: true,
                    leadingUnderscore: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow files with file extension and leading underscore when both options are "false"', function () {
            var source = '@import "_foo.less";';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "_foo.less" should not include the file extension.'
            },
            {
                column: 9,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "_foo.less" should not include a leading underscore.'
            }];

            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    leadingUnderscore: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow files with file extension and leading underscore when both options are "true"', function () {
            var source = '@import "_foo.less";';
            var ast;

            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: true,
                    leadingUnderscore: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should check url imports with quotes', function () {
            var source = '@import url("foo.less");';
            var ast;
            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    exclude: []
                }
            };

            var expected = [{
                column: 13,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            ast = parseAST(source);
            ast = ast.first();

            assert.deepEqual(expected, lint(options, ast));
        });

        it('should check url imports without quotes', function () {
            var source = '@import url(foo.less);';
            var ast;
            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    exclude: []
                }
            };

            var expected = [{
                column: 13,
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "foo.less" should not include the file extension.'
            }];

            ast = parseAST(source);
            ast = ast.first();

            assert.deepEqual(expected, lint(options, ast));
        });

        it('should ignore @import strings containing absolute URLs', function () {
            var source = '@import "http://example.com/foo.css";';
            var ast;
            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should ignore @import urls() containing absolute URLs', function () {
            var source = '@import url("http://example.com/foo.css");';
            var ast;
            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not report excluded files', function () {
            var source = '@import "foo.less";';
            var ast;

            var options = {
                importPath: {
                    enabled: true,
                    filenameExtension: false,
                    exclude: ['foo.less']
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should ignore other at-rules', function () {
            var source = '@charset "UTF-8";';
            var ast;
            var options = {
                importPath: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '@import "foo.less";';
            var ast;
            var options = {
                importPath: {
                    enabled: false,
                    filenameExtension: false
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '@import "foo.less";';
            var ast;
            var options = {
                importPath: false
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.equal(null, lint(options, ast));
        });
    });
});
