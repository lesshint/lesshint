var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var hexValidation = require('../../../lib/linters/hex_validation');

    describe('#hexValidation()', function () {
        it('should allow valid hex values', function () {
            var source = '.foo { color: #AABBCC; }';
            var ast;

            var options = {
                hexValidation: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, hexValidation({
                config: options,
                node: ast
            }));
        });

        it('should not allow invalid hex values', function () {
            var source = '.foo { color: #AABBC; }';
            var actual;
            var ast;

            var expected = {
                column: 15,
                file: 'test.less',
                line: 1,
                linter: 'hexValidation',
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            };

            var options = {
                hexValidation: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = hexValidation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should find invalid hex values in background declarations', function () {
            var source = '.foo { background: url(test.png) no-repeat #AABBC; }';
            var ast;

            var expected = {
                column: 44,
                file: 'test.less',
                line: 1,
                linter: 'hexValidation',
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            };

            var options = {
                hexValidation: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = hexValidation({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not do anything when the value is something other than a hex color', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                hexValidation: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, hexValidation({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: #AABBC; }';
            var ast;
            var options = {
                hexValidation: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, hexValidation({
                config: options,
                node: ast
            }));
        });
    });
});
