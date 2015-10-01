var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#idSelector()', function () {
        it('should allow selectors without IDs', function () {
            var source = '.foo {}';
            var ast;

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow IDs in selectors', function () {
            var source = '.foo #bar {}';
            var actual;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                linter: 'idSelector',
                message: 'Selectors should not use IDs.'
            }];

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow excluded IDs', function () {
            var source = '#foo {}';
            var ast;

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: ['foo']
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow excluded IDs defined with #', function () {
            var source = '#foo {}';
            var ast;

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: ['#foo']
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow IDs that are not excluded', function () {
            var source = '.foo #bar {}';
            var actual;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                linter: 'idSelector',
                message: 'Selectors should not use IDs.'
            }];

            var options = {
                idSelector: {
                    enabled: true,
                    exclude: ['foo']
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo #bar {}';
            var ast;
            var options = {
                idSelector: {
                    enabled: false,
                    exclude: []
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo #bar {}';
            var ast;
            var options = {
                idSelector: false
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, lint(options, ast));
        });
    });
});
