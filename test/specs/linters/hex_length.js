var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var hexLength = require('../../../lib/linters/hex_length');

    describe('#hexLength()', function () {
        it('should not allow short hand hex values when "style" is "long', function () {
            var source = '.foo { color: #ABC; }';
            var actual;
            var ast;

            var expected = {
                column: 15,
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
            ast = ast.first().first('block').first('declaration');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow longhand hex values when "style" is "long"', function () {
            var source = '.foo { color: #AABBCC; }';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should not allow longhand hex values when "style" is "short', function () {
            var source = '.foo { color: #AABBCC; }';
            var actual;
            var ast;

            var expected = {
                column: 15,
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
            ast = ast.first().first('block').first('declaration');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow short hand hex values when "style" is "short"', function () {
            var source = '.foo { color: #ABC; }';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should allow longhand hex values can can be written with a shorthand when "style" is "short"', function () {
            var source = '.foo { color: #4B7A19; }';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, hexLength({
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
            ast = ast.first().first('block').first('declaration');

            actual = hexLength({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not do anything when the value is something else than a hex color', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'long'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: #abc; }';
            var ast;
            var options = {
                hexLength: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, hexLength({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: #aabbcc; }';
            var ast;

            var options = {
                hexLength: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(hexLength.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
