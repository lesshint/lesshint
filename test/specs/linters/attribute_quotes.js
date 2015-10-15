var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#attributeQuotes()', function () {
        it('should allow single quotes', function () {
            var source = "input[type='text'] {}";
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow double quotes', function () {
            var source = 'input[type="text"] {}';
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow missing quotes', function () {
            var source = 'input[type=text] {}';
            var actual;
            var ast;

            var expected = [{
                column: 12,
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use quotes.'
            }];

            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return undefined for value-less selectors', function () {
            var source = 'input[disabled] {}';
            var actual;
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = 'input[type=text] {}';
            var ast;
            var options = {
                attributeQuotes: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'input[type=text] {}';
            var ast;
            var options = {
                attributeQuotes: false
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('attributeSelector').first('attributeValue');

            assert.equal(undefined, lint(options, ast));
        });
    });
});
