'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#importantRule()', function () {
        it('should not do anything when there is no !important present', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                importantRule: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow !important', function () {
            var source = '.foo { color: red !important; }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'importantRule',
                message: '!important should not be used.'
            }];

            var options = {
                importantRule: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { border: none; }';
            var ast;
            var options = {
                importantRule: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { border: none; }';
            var ast;
            var options = {
                importantRule: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });
    });
});
