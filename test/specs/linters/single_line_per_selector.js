var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var singleLinePerSelector = require('../../../lib/linters/single_line_per_selector');

    describe('#singleLinePerSelector()', function () {
        it('should allow selectors on separate lines', function () {
            var source = '.foo, \n .bar {}';
            var ast;

            var options = {
                singleLinePerSelector: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('selector');

            assert.strictEqual(null, singleLinePerSelector({
                config: options,
                node: ast
            }));
        });

        it('should not allow multiple selectors on the same line', function () {
            var source = '.foo, .bar {}';
            var actual;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                linter: 'singleLinePerSelector',
                message: 'Each selector should be on its own line.'
            }];

            var options = {
                singleLinePerSelector: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('selector');

            actual = singleLinePerSelector({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo, .bar {}';
            var ast;
            var options = {
                singleLinePerSelector: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('selector');

            assert.equal(null, singleLinePerSelector({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo, .bar {}';
            var ast;
            var options = {
                singleLinePerSelector: false
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('selector');

            assert.equal(null, singleLinePerSelector({
                config: options,
                node: ast
            }));
        });
    });
});
