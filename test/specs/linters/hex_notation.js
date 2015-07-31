var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var hexNotation = require('../../../lib/linters/hex_notation');

    describe('#hexNotation()', function () {
        it('should not allow uppercase hex values when "style" is "lowercase"', function () {
            var source = 'color: #AABBCC;';
            var actual;
            var ast;

            var expected = {
                column: 8,
                line: 1,
                linter: 'hexNotation',
                message: '#AABBCC should be written in lowercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow lowercase hex values when "style" is "lowercase"', function () {
            var source = 'color: #aabbcc;';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should not allow lowercase hex values when "style" is "uppercase"', function () {
            var source = 'color: #aabbcc;';
            var actual;
            var ast;

            var expected = {
                column: 8,
                line: 1,
                linter: 'hexNotation',
                message: '#aabbcc should be written in uppercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'uppercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow uppercase hex values when "style" is "uppercase"', function () {
            var source = 'color: #AABBCC;';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'uppercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should find hex values in background declarations', function () {
            var source = 'background: url(test.png) no-repeat #AABBCC;';
            var ast;

            var expected = {
                column: 37,
                line: 1,
                linter: 'hexNotation',
                message: '#AABBCC should be written in lowercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow uppercase hex values in variables when "style" is "lowercase" (#28)', function () {
            var source = '@color: #AABBCC;';
            var actual;
            var ast;

            var expected = {
                column: 9,
                line: 1,
                linter: 'hexNotation',
                message: '#AABBCC should be written in lowercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('color');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow lowercase hex values in variables when "style" is "uppercase" (#28)', function () {
            var source = '@color: #aabbcc;';
            var actual;
            var ast;

            var expected = {
                column: 9,
                line: 1,
                linter: 'hexNotation',
                message: '#aabbcc should be written in uppercase.'
            };

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'uppercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('color');

            actual = hexNotation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should ignore colors with only numbers', function () {
            var source = 'color: #123456;';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should ignore colors with invalid length', function () {
            var source = 'color: #abc1;';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should ignore colors with invalid characters', function () {
            var source = 'color: #abck;';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'lowercase'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = 'color: #abc;';
            var ast;
            var options = {
                hexNotation: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.equal(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'color: #abc;';
            var ast;
            var options = {
                hexNotation: false
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.equal(null, hexNotation({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = 'color: #aabbcc;';
            var ast;

            var options = {
                hexNotation: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.throws(hexNotation.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
