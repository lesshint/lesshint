'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#trailingWhitespace()', function () {
        it('should allow lines with no trailing whitespace', function () {
            var source = '.foo {}';
            var ast;

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow lines with trailing new line characters', function () {
            var source = '.foo {}\n';
            var ast;

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow lines with trailing whitespace', function () {
            var source = '.foo {}  ';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'trailingWhitespace',
                message: 'There should\'t be any trailing whitespace.'
            }];

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = parseAST(source);

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow lines with trailing tabs', function () {
            var source = '.foo {} \t';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'trailingWhitespace',
                message: "There should't be any trailing whitespace."
            }];

            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = parseAST(source);

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should ignore empty files', function () {
            var source = '';
            var ast;
            var options = {
                trailingWhitespace: {
                    enabled: true
                }
            };

            ast = parseAST(source);

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo {}  ';
            var ast;
            var options = {
                trailingWhitespace: {
                    enabled: false
                }
            };

            ast = parseAST(source);

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo {}  ';
            var ast;
            var options = {
                trailingWhitespace: false
            };

            ast = parseAST(source);

            assert.equal(null, lint(options, ast));
        });
    });
});
