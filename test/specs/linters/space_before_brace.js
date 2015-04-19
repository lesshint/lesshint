var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceBeforeBrace = require('../../../lib/linters/space_before_brace');

    describe('#spaceBeforeBrace()', function () {
        it('should not tolerate missing space', function () {
            var source = '.foo{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 1,
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

        it('should allow one space', function () {
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

            assert.equal(true, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should handle multiple simple selectors with one space', function () {
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

            assert.equal(true, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should not tolerate multiple simple selectors with missing space', function () {
            var source = '.foo, .bar{ color: red; }';
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

        it('should not tolerate multiple spaces', function () {
            var source = '.foo  { color: red; }';
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

        it('should not tolerate multiple simple selectors with multiple spaces', function () {
            var source = '.foo, .bar  { color: red; }';
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

        it('should allow one new line', function () {
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

            assert.equal(true, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should handle multiple simple selectors with one new line', function () {
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

            assert.equal(true, spaceBeforeBrace({
                config: options,
                node: ast
            }));
        });

        it('should not tolerate multiple new lines', function () {
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

        it('should not tolerate multiple simple selectors with multiple new lines', function () {
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

        it('should return null run when disabled', function () {
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
    });
});
