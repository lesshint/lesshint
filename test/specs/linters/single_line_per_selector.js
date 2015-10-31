'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#singleLinePerSelector()', function () {
        it('should allow selectors on separate lines', function () {
            var source = '.foo, \n .bar {}';
            var ast;

            var options = {
                singleLinePerSelector: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset');

            assert.strictEqual(undefined, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first('ruleset');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('ruleset');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo, .bar {}';
            var ast;
            var options = {
                singleLinePerSelector: false
            };

            ast = parseAST(source);
            ast = ast.first('ruleset');

            assert.equal(null, lint(options, ast));
        });
    });
});
