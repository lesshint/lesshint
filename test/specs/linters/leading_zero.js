var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow a missing leading zero when "style" is "include_zero"', function () {
            var source = '.foo { font-size: .5em; }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'leadingZero',
                message: '.5 should be written with a leading zero.'
            }];

            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'include_zero'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow a leading zero when "style" is "exclude_zero"', function () {
            var source = '.foo { font-size: 0.5em; }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'leadingZero',
                message: '0.5 should be written without a leading zero.'
            }];

            var options = {
                leadingZero: {
                    enabled: true,
                    style: 'exclude_zero'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo { font-size: .5em; }';
            var ast;
            var options = {
                leadingZero: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { font-size: .5em; }';
            var ast;
            var options = {
                leadingZero: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
