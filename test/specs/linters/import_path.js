var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var importPath = require('../../../lib/linters/import_path');

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

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, importPath({
                config: options,
                node: ast
            }));
        });

        it('should not allow filename with extension when "filenameExtension" is "false"', function () {
            var source = '@import "foo.less";';
            var ast;

            var expected = [{
                column: 9,
                file: 'test.less',
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

            ast = linter.parseAST(source);
            ast = ast.first();

            actual = importPath({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, importPath({
                config: options,
                node: ast
            }));
        });

        it('should not allow filename without extension when "filenameExtension" is "true"', function () {
            var source = '@import "foo";';
            var ast;

            var expected = [{
                column: 9,
                file: 'test.less',
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

            ast = linter.parseAST(source);
            ast = ast.first();

            actual = importPath({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, importPath({
                config: options,
                node: ast
            }));
        });

        it('should not allow filename with leading underscore when "leadingUnderscore" is "false"', function () {
            var source = '@import "_foo";';
            var ast;

            var expected = [{
                column: 9,
                file: 'test.less',
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

            ast = linter.parseAST(source);
            ast = ast.first();

            actual = importPath({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, importPath({
                config: options,
                node: ast
            }));
        });

        it('should not allow filename without leading underscore when "leadingUnderscore" is "true"', function () {
            var source = '@import "foo";';
            var ast;

            var expected = [{
                column: 9,
                file: 'test.less',
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

            ast = linter.parseAST(source);
            ast = ast.first();

            actual = importPath({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow files with file extension and leading underscore when both options are "false"', function () {
            var source = '@import "_foo.less";';
            var ast;

            var expected = [{
                column: 9,
                file: 'test.less',
                line: 1,
                linter: 'importPath',
                message: 'Imported file, "_foo.less" should not include the file extension.'
            },
            {
                column: 9,
                file: 'test.less',
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

            ast = linter.parseAST(source);
            ast = ast.first();

            actual = importPath({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, importPath({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first();

            assert.strictEqual(null, importPath({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, importPath({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '@import "foo.less";';
            var ast;
            var options = {
                importPath: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, importPath({
                config: options,
                node: ast
            }));
        });
    });
});
