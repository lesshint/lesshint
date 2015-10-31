'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#borderZero()', function () {
        it('should allow "none" as a value when "style" is "none" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow 0 as a value when "style" is "zero" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'zero'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow 0 as a value when "style" is "none" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'borderZero',
                message: 'Border properties should use "none" instead of 0.'
            }];

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow "none" as a value when "style" is "zero" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'borderZero',
                message: 'Border properties should use 0 instead of "none".'
            }];

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'zero'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-bottom"', function () {
            var source = '.foo { border-bottom: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-left"', function () {
            var source = '.foo { border-left: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-right"', function () {
            var source = '.foo { border-right: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-top"', function () {
            var source = '.foo { border-top: none; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not do anything when there is a actual border specified', function () {
            var source = '.foo { border: 1px solid #000000; }';
            var ast;

            var options = {
                borderZero: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo { border: none; }';
            var ast;
            var options = {
                borderZero: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { border: none; }';
            var ast;
            var options = {
                borderZero: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(undefined, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { border: 0; }';
            var ast;

            var options = {
                borderZero: {
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
