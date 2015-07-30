var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var attributeQuotes = require('../../../lib/linters/attribute_quotes');

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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.strictEqual(null, attributeQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow double quotes when "style" is "single"', function () {
            var source = 'input[type="text"] {}';
            var actual;
            var ast;

            var expected = {
                column: 12,
                file: 'test.less',
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use single quotes.'
            };

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'single'
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

        it('should not allow missing quotes when "style" is "single"', function () {
            var source = 'input[type=text] {}';
            var actual;
            var ast;

            var expected = {
                column: 12,
                file: 'test.less',
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use single quotes.'
            };

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'single'
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

        it('should allow double quotes when "style" is "double"', function () {
            var source = 'input[type="text"] {}';
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'double'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.strictEqual(null, attributeQuotes({
                config: options,
                node: ast
            }));
        });

        it('should not allow single quotes when "style" is "double"', function () {
            var source = "input[type='text'] {}";
            var actual;
            var ast;

            var expected = {
                column: 12,
                file: 'test.less',
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use double quotes.'
            };

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'double'
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

        it('should not allow missing quotes when "style" is "double"', function () {
            var source = 'input[type=text] {}';
            var actual;
            var ast;

            var expected = {
                column: 12,
                file: 'test.less',
                line: 1,
                linter: 'attributeQuotes',
                message: 'Attribute selectors should use double quotes.'
            };

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'double'
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

        it('should throw on invalid "style" value', function () {
            var source = 'input[type=text] {}';
            var ast;

            var options = {
                attributeQuotes: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector');

            assert.throws(attributeQuotes.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
