var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var leadingZero = require('../../../lib/linters/leading_zero');

    describe('#leadingZero()', function () {
        it('should allow leading zero when "style" is "include_zero"', function () {
            var source = '.foo { font-size: 0.5em; }';
            var ast;
            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'include_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(true, leadingZero({
                config: options,
                node: ast
            }));
        });

        it('should not allow a missing leading zero when "style" is "include_zero"', function () {
            var source = '.foo { font-size: .5em; }';
            var actual;
            var ast;

            var expected = {
                column: 19,
                file: 'test.less',
                line: 1,
                linter: 'leadingZero',
                message: '.5 should be written with a leading zero.'
            };

            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'include_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = leadingZero({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow missing leading zero when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: .5em; }';
            var ast;
            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'exclude_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(true, leadingZero({
                config: options,
                node: ast
            }));
        });

        it('should not allow a leading zero when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 0.5em; }';
            var actual;
            var ast;

            var expected = {
                column: 19,
                file: 'test.less',
                line: 1,
                linter: 'leadingZero',
                message: '0.5 should be written without a leading zero.'
            };

            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'exclude_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = leadingZero({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should ignore numbers greater than zero', function () {
            var source = '.foo { font-size: 1.5em; }';
            var ast;
            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'include_zero'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, leadingZero({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled', function () {
            var source = '.foo { font-size: .5em; }';
            var ast;
            var options = {
                leadingZero: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, leadingZero({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { font-size: .5em; }';
            var ast;
            var options = {
                leadingZero: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, leadingZero({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { font-size: .5em; }';
            var ast;

            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(leadingZero.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
