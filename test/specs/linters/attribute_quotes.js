var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#attributeQuotes()', function () {
        it('should allow single quotes when "style" is "single"', function () {
            var source = "input[type='text'] {}";
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow double quotes when "style" is "single"', function () {
            var source = 'input[type="text"] {}';
            var actual;
            var ast;

            var expected = [{
                column: 12,
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use single quotes.'
            }];

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing quotes when "style" is "single"', function () {
            var source = 'input[type=text] {}';
            var actual;
            var ast;

            var expected = [{
                column: 12,
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use single quotes.'
            }];

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'single'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow double quotes when "style" is "double"', function () {
            var source = 'input[type="text"] {}';
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow single quotes when "style" is "double"', function () {
            var source = "input[type='text'] {}";
            var actual;
            var ast;

            var expected = [{
                column: 12,
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use double quotes.'
            }];

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing quotes when "style" is "double"', function () {
            var source = 'input[type=text] {}';
            var actual;
            var ast;

            var expected = [{
                column: 12,
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use double quotes.'
            }];

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
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
            ast = ast.first().first('selector').first('simpleSelector');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'input[type=text] {}';
            var ast;
            var options = {
                attributeQuotes: false
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null for value-less selectors', function () {
            var source = 'input[disabled] {}';
            var ast;
            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.equal(null, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = 'input[type=text] {}';
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
