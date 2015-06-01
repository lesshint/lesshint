var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var hexLength = require('../../../lib/linters/hex_length');

    describe('#hexLength()', function () {
        it('should not allow short hand hex values when "style" is "long"', function () {
            var source = 'color: #ABC;';
            var actual;
            var ast;

            var expected = {
                column: 8,
                file: 'test.less',
                line: 1,
                linter: 'hexLength',
                message: '#ABC should be written in the long-form format.'
            };

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow longhand hex values when "style" is "long"', function () {
            var source = 'color: #AABBCC;';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(true, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should not allow longhand hex values when "style" is "short"', function () {
            var source = 'color: #AABBCC;';
            var actual;
            var ast;

            var expected = {
                column: 8,
                file: 'test.less',
                line: 1,
                linter: 'hexLength',
                message: '#AABBCC should be written in the short-form format.'
            };

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow short hand hex values when "style" is "short"', function () {
            var source = 'color: #ABC;';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(true, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should allow longhand hex values can can be written with a shorthand when "style" is "short"', function () {
            var source = 'color: #4B7A19;';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(true, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should find hex values in background declarations', function () {
            var source = 'background: url(test.png) no-repeat #AABBCC;';
            var ast;

            var expected = {
                column: 37,
                file: 'test.less',
                line: 1,
                linter: 'hexLength',
                message: '#AABBCC should be written in the short-form format.'
            };

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow short hand hex values in variables when "style" is "long" (#28)', function () {
            var source = '@color: #ABC;';
            var actual;
            var ast;

            var expected = {
                column: 9,
                file: 'test.less',
                line: 1,
                linter: 'hexLength',
                message: '#ABC should be written in the long-form format.'
            };

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('color');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow longhand hex values in variables when "style" is "short" (#28)', function () {
            var source = '@color: #AABBCC;';
            var actual;
            var ast;

            var expected = {
                column: 9,
                file: 'test.less',
                line: 1,
                linter: 'hexLength',
                message: '#AABBCC should be written in the short-form format.'
            };

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('color');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not do anything when the value is something else than a hex color', function () {
            var source = 'color: red;';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('ident');

            assert.strictEqual(null, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should ignore invalid colors', function () {
            var source = 'color: #abc1;';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(true, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = 'color: #abc;';
            var ast;
            var options = {
                hexLength: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.equal(null, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'color: #abc;';
            var ast;
            var options = {
                hexLength: false
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.equal(null, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = 'color: #aabbcc;';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.throws(hexLength.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
