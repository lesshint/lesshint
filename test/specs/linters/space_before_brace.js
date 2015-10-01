var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
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

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow one space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces when "style" is "no_space"', function () {
            var source = '.foo  { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow one new line when "style" is "no_space"', function () {
            var source = '.foo\n{ color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple new lines when "style" is "no_space"', function () {
            var source = '.foo\n\n{ color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow missing space when "style" option is "one_space"', function () {
            var source = '.foo{ color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow missing space when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar{ color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 11,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces when "style" is "one_space"', function () {
            var source = '.foo  { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar  { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 13,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow multiple new lines when "style" is "new_line"', function () {
            var source = '.foo\n\n{ color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: linter.message.newLine
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'new_line'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple new lines when a selector group is used and "style" is "new_line"', function () {
            var source = '.foo, .bar\n\n{ color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 11,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: linter.message.newLine
            }];

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'new_line'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');
            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle media queries', function () {
            var source = '@media screen and (max-width: 480px) { color: blue; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atruleb');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle media queries without space', function () {
            var source = '@media screen and (max-width: 480px){ color: blue; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atruleb');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle nested media queries', function () {
            var source = '.class{ color: red; @media screen and (max-width: 480px){ color: blue; } }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle empty media queries', function () {
            var source = '@media(all) {}';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should handle media queries', function () {
            var source = '@media screen and (max-width: 480px) { color: blue; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('atruleb');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should handle media queries without space', function () {
            var source = '@media screen and (max-width: 480px){ color: blue; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('atruleb');

            assert.strictEqual(null, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should handle nested media queries', function () {
            var source = '.class{ color: red; @media screen and (max-width: 480px){ color: blue; } }';
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

        it('should handle empty media queries', function () {
            var source = '@media(all) {}';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first();

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

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo{ color: red; }';
            var ast;
            var options = {
                spaceBeforeBrace: false
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(undefined, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo{ color: red; }';
            var ast;
            var options = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
