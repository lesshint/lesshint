'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#emptyRule()', function () {
        it('should allow rules with declarations', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                emptyRule: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow empty rules', function () {
            var source = '.foo {}';
            var actual;
            var ast;

            var expected = [{
                column: 1,
                line: 1,
                linter: 'emptyRule',
                message: 'There shouldn\'t be any empty rules present.'
            }];

            var options = {
                emptyRule: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow empty rules with a space', function () {
            var source = '.foo { }';
            var actual;
            var ast;

            var expected = [{
                column: 1,
                line: 1,
                linter: 'emptyRule',
                message: 'There shouldn\'t be any empty rules present.'
            }];

            var options = {
                emptyRule: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow rules with only mixins (#16)', function () {
            var source = '.foo { .mixin(); }';
            var ast;

            var options = {
                emptyRule: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                emptyRule: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                emptyRule: false
            };

            ast = parseAST(source);
            ast = ast.first();

            assert.equal(null, lint(options, ast));
        });
    });
});
