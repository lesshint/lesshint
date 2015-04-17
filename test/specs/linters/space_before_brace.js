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
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                node: ast,
                config: options
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(true, spaceBeforeBrace({
                node: ast,
                config: options
            }));
        });

        it('should handle multiple simple selectors', function () {
            var source = '.foo, .bar { color: red; }';
            var ast;

            var options = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(true, spaceBeforeBrace({
                node: ast,
                config: options
            }));
        });

        it('should fail with multiple simple selectors and no space', function () {
            var source = '.foo, .bar{ color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 7,
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.'
            };

            var options = {
                spaceBeforeBrace: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');
            actual = spaceBeforeBrace({
                node: ast,
                config: options
            });

            assert.deepEqual(actual, expected);
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
                node: ast,
                config: options
            }));
        });
    });
});
