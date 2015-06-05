var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceBeforeBrace = require('../../../lib/linters/space_before_brace');

    describe('#spaceBeforeBrace()', function () {
        it('should allow no space when "style" is "no_space"', function () {
            var source = '.foo{ color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should not allow one space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 5,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces when "style" is "no_space"', function () {
            var source = '.foo  { color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 5,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow one new line when "style" is "no_space"', function () {
            var source = '.foo\n{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 5,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple new lines when "style" is "no_space"', function () {
            var source = '.foo\n\n{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 5,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing space when "style" option is "one_space"', function () {
            var source = '.foo{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 5,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar { color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing space when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 11,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces when "style" is "one_space"', function () {
            var source = '.foo  { color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 7,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar  { color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 13,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one new line when "style" is "new_line"', function () {
            var source = '.foo\n{ color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'new_line'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should allow one new line when a selector group is used and "style" is "new_line"', function () {
            var source = '.foo, .bar\n{ color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'new_line'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should not allow multiple new lines when "style" is "new_line"', function () {
            var source = '.foo\n\n{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 5,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be on it\'s own line.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'new_line'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple new lines when a selector group is used and "style" is "new_line"', function () {
            var source = '.foo, .bar\n\n{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 11,
                file: 'test.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be on it\'s own line.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'new_line'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should handle mixins', function () {
            var source = '.foo() { color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = '.foo{ color: red; }';
            var ast;
            var options = {
                spaceBeforeBrace: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo{ color: red; }';
            var ast;
            var options = {
                spaceBeforeBrace: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo{ color: red; }';
            var ast;
            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: "invalid"
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.throws(spaceBeforeBrace.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
