var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
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

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow blocks with non-alphabetized properties', function () {
            var source = '.foo { padding-top: 4px; color: red; right: 5px}';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'propertyOrdering',
                message: 'Property ordering is not alphabetized'
            }];

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'alpha'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo { font-size: 16px; border: 0; }';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { font-size: 16px; border: 0; }';
            var ast;

            var options = {
                propertyOrdering: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: red; color: blue; }';
            var ast;

            var options = {
                propertyOrdering: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
