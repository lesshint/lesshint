var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var trailingZero = require('../../../lib/linters/trailing_zero');

    describe('#trailingZero()', function () {
        it('should allow trailing zero when "style" is "include_zero"', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'include_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, trailingZero({
                config: options,
                node: ast
            }));
        });

        it('should not allow a missing trailing zero when "style" is "include_zero"', function () {
            var source = '.foo { font-size: 1.5em; }';
            var actual;
            var ast;

            var expected = {
                column: 19,
                file: 'test.less',
                line: 1,
                linter: 'trailingZero',
                message: '1.5 should be written with trailing zeros.'
            };

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'include_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = trailingZero({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow missing trailing zero when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 1.5em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'exclude_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, trailingZero({
                config: options,
                node: ast
            }));
        });

        it('should not allow a trailing zero when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 1.50em; }';
            var actual;
            var ast;

            var expected = {
                column: 19,
                file: 'test.less',
                line: 1,
                linter: 'trailingZero',
                message: '1.50 should be written without trailing zeros.'
            };

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'exclude_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = trailingZero({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow multiple trailing zeros when "style" is "include_zero"', function () {
            var source = '.foo { font-size: 1.500em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'include_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, trailingZero({
                config: options,
                node: ast
            }));
        });

        it('should not allow multiple trailing zeros when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 1.500em; }';
            var actual;
            var ast;

            var expected = {
                column: 19,
                file: 'test.less',
                line: 1,
                linter: 'trailingZero',
                message: '1.500 should be written without trailing zeros.'
            };

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'exclude_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = trailingZero({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;
            var options = {
                trailingZero: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, trailingZero({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;
            var options = {
                trailingZero: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, trailingZero({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { font-size: 1.50em; }';
            var ast;

            var options = {
                trailingZero: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(trailingZero.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
