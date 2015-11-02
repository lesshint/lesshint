var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#mixinOrdering()', function () {
        it('should allow blocks with only one property', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                mixinOrdering: {
                    enabled: true,
                    style: 'first'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow blocks with only one mixin', function () {
            var source = '.foo { .doit; }';
            var ast;

            var options = {
                mixinOrdering: {
                    enabled: true,
                    style: 'first'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow blocks with mixins first', function () {
            var source = '.foo { .doit; color: red; }';
            var ast;

            var options = {
                mixinOrdering: {
                    enabled: true,
                    style: 'first'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow blocks with mixins last', function () {
            var source = '.foo { color: red; .doit; }';
            var ast;

            var options = {
                mixinOrdering: {
                    enabled: true,
                    style: 'last'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow blocks with mixins not first', function () {
            var source = '.foo { padding-top: 4px; .doit; color: red; right: 5px}';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'mixinOrdering',
                message: 'Mixins should be called before other properties are declared.'
            }];

            var options = {
                mixinOrdering: {
                    enabled: true,
                    style: 'first'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow blocks with mixins not last', function () {
            var source = '.foo { padding-top: 4px; .doit; color: red; right: 5px}';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'mixinOrdering',
                message: 'Mixins should be called after other properties are declared.'
            }];

            var options = {
                mixinOrdering: {
                    enabled: true,
                    style: 'last'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            console.log(actual);

            assert.deepEqual(actual, expected);
        });

        it('should not report identical mixins', function () {
            var source = '.foo { .doit; .doit; }';
            var ast;

            var options = {
                mixinOrdering: {
                    enabled: true,
                    style: 'first'
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
                mixinOrdering: {
                    enabled: true,
                    style: 'first'
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
                mixinOrdering: {
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
                mixinOrdering: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

    });
});
