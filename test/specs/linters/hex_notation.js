var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var hexNotation = require('../../../lib/linters/hex_notation');

    describe('#hexNotation()', function () {
        it('should not allow uppercase hex values when "style" is "lowercase', function () {
            var source = '.foo { color: #AABBCC; }';
            var actual;
            var ast;

            var expected = {
                column: 15,
                file: 'test.less',
                line: 1,
                linter: 'hexNotation',
                message: 'Hexadecimal colors should be written in lowercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow lowercase hex values when "style" is "lowercase', function () {
            var source = '.foo { color: #aabbcc; }';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should not allow lowercase hex values when "style" is "uppercase', function () {
            var source = '.foo { color: #aabbcc; }';
            var actual;
            var ast;

            var expected = {
                column: 15,
                file: 'test.less',
                line: 1,
                linter: 'hexNotation',
                message: 'Hexadecimal colors should be written in uppercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'uppercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow uppercase hex values when "style" is "uppercase', function () {
            var source = '.foo { color: #AABBCC; }';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'uppercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should find hex values in background declarations', function () {
            var source = '.foo { background: url(test.png) no-repeat #AABBCC; }';
            var ast;

            var expected = {
                column: 44,
                file: 'test.less',
                line: 1,
                linter: 'hexNotation',
                message: 'Hexadecimal colors should be written in lowercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null run when disabled', function () {
            var source = '.foo { color: #abc; }';
            var ast;
            var options = {
                hexNotation: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: #aabbcc; }';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(hexNotation.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
