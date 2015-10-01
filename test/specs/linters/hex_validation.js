var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#hexValidation()', function () {
        it('should allow valid hex values', function () {
            var source = 'color: #AABBCC;';
            var ast;

            var options = {
                hexValidation: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow invalid hex values', function () {
            var source = 'color: #AABBC;';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'hexValidation',
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            var options = {
                hexValidation: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should find invalid hex values in background declarations', function () {
            var source = 'background: url(test.png) no-repeat #AABBC;';
            var ast;

            var expected = [{
                column: 37,
                line: 1,
                linter: 'hexValidation',
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            var options = {
                hexValidation: {
                    enabled: true,
                    style: 'short'
                }
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow invalid hex values in variable declarations (#28)', function () {
            var source = '@color: #AABBC;';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'hexValidation',
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            var options = {
                hexValidation: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('color');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not do anything when the value is something other than a hex color', function () {
            var source = 'color: red;';
            var ast;

            var options = {
                hexValidation: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('ident');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = 'color: #AABBC;';
            var ast;
            var options = {
                hexValidation: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'color: #AABBC;';
            var ast;
            var options = {
                hexValidation: false
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            assert.equal(null, lint(options, ast));
        });
    });
});
