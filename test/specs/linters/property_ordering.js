var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var propertyOrdering = require('../../../lib/linters/property_ordering');

    describe('#propertyOrdering()', function () {
        it('should allow blocks with only one property', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'alpha'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, propertyOrdering({
                config: options,
                node: ast
            }));
        });

        it('should allow blocks with alphabetized properties', function () {
            var source = '.foo { color: red; padding-top: 4px; right: 5px}';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'alpha'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, propertyOrdering({
                config: options,
                node: ast
            }));
        });

        it('should not allow blocks with non-alphabetized properties', function () {
            var source = '.foo { padding-top: 4px; color: red; right: 5px}';
            var actual;
            var ast;

            var expected = {
                column: 26,
                line: 1,
                linter: 'propertyOrdering',
                message: 'Property ordering is not alphabetized'
            };

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'alpha'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = propertyOrdering({
                config: options,
                node: ast
            });

            assert.deepEqual(actual, expected);
        });

        it('should not report identical property names. See #59', function () {
            var source = '.foo { color: red; color: blue; }';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'alpha'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, propertyOrdering({
                config: options,
                node: ast
            }));
        });

        it('should not try to check variables', function () {
            var source = '.foo { @var: auto; }';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'alpha'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, propertyOrdering({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = '.foo { font-size: 16px; border: 0; }';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, propertyOrdering({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { font-size: 16px; border: 0; }';
            var ast;

            var options = {
                propertyOrdering: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, propertyOrdering({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { border: 0; }';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(propertyOrdering.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
