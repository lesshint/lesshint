var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var stringQuotes = require('../../../lib/linters/string_quotes');

    describe('#stringQuotes()', function () {
        it('should allow single quotes when "style" is "single"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow double quotes when "style" is "single"', function () {
            var source = '.foo { content: "Hello world"; }';
            var actual;
            var ast;

            var expected = [{
                column: 17,
                file: 'test.less',
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use single quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = linter.parseAST(source);

            actual = stringQuotes({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow double quotes when "style" is "double"', function () {
            var source = '.foo { content: "Hello world"; }';
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow single quotes when "style" is "double"', function () {
            var source = ".foo { content: 'Hello world'; }";
            var actual;
            var ast;

            var expected = [{
                column: 17,
                file: 'test.less',
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use double quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = linter.parseAST(source);

            actual = stringQuotes({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should handle quotes in functions', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should handle concatenated strings', function () {
            var source = ".foo { content: ' (' attr(id) ')'; }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should allow single quotes in variable declarations when "style" is "single"', function () {
            var source = "@foo: 'Hello world';";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow double quotes in variable declarations when "style" is "single"', function () {
            var source = '@foo: "Hello world";';
            var actual;
            var ast;

            var expected = [{
                column: 7,
                file: 'test.less',
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use single quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = linter.parseAST(source);

            actual = stringQuotes({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow double quotes in variable declarations when "style" is "double"', function () {
            var source = '@foo: "Hello world";';
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = linter.parseAST(source);

            assert.strictEqual(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow single quotes in variable declarations when "style" is "double"', function () {
            var source = "@foo: 'Hello world';";
            var actual;
            var ast;

            var expected = [{
                column: 7,
                file: 'test.less',
                line: 1,
                linter: 'stringQuotes',
                message: 'Strings should use double quotes.'
            }];

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = linter.parseAST(source);

            actual = stringQuotes({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = ".foo { content: 'Hello world' }";
            var ast;
            var options = {
                stringQuotes: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);

            assert.equal(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = ".foo { content: 'Hello world' }";
            var ast;
            var options = {
                stringQuotes: false
            };

            ast = linter.parseAST(source);

            assert.equal(null, stringQuotes({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = ".foo { content: 'Hello world' }";
            var ast;

            var options = {
                stringQuotes: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);

            assert.throws(stringQuotes.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
