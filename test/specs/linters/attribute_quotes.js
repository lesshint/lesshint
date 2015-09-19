var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var attributeQuotes = require('../../../lib/linters/attribute_quotes');

    describe('#attributeQuotes()', function () {
        it('should allow single quotes', function () {
            var source = "input[type='text'] {}";
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.strictEqual(null, attributeQuotes({
                config: options,
                node: ast
            }));
        });

        it('should allow double quotes', function () {
            var source = 'input[type="text"] {}';
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.strictEqual(null, attributeQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing quotes', function () {
            var source = 'input[type=text] {}';
            var actual;
            var ast;

            var expected = {
                column: 6,
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use quotes.'
            };

            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            actual = attributeQuotes({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null for value-less selectors', function () {
            var source = 'input[disabled] {}';
            var ast;
            var options = {
                attributeQuotes: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.equal(null, attributeQuotes({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = 'input[type=text] {}';
            var ast;
            var options = {
                attributeQuotes: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.equal(null, attributeQuotes({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'input[type=text] {}';
            var ast;
            var options = {
                attributeQuotes: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.equal(null, attributeQuotes({
                config: options,
                node: ast
            }));
        });
    });
});
