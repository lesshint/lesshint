var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#comment()', function () {
        it('should allow single line comments', function () {
            var source = '// Hello world';
            var ast;

            var options = {
                comment: {
                    enabled: true
                }
            };

            ast = parseAST(source).first('singlelineComment');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow multi-line comments', function () {
            var source = '/* Hello world */';
            var actual;
            var ast;

            var expected = [{
                column: 1,
                line: 1,
                linter: 'comment',
                message: 'There shouldn\'t be any multi-line comments.'
            }];

            var options = {
                comment: {
                    enabled: true
                }
            };

            ast = parseAST(source).first('multilineComment');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow comments matching "allowed" option regexp', function () {
            var source = '/*! Hello world */';
            var ast;

            var options = {
                comment: {
                    allowed: '^!',
                    enabled: true
                }
            };

            ast = parseAST(source).first('multilineComment');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '/* Hello world */';
            var ast;
            var options = {
                comment: {
                    enabled: false
                }
            };

            ast = parseAST(source).first('multilineComment');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '/* Hello world */';
            var ast;
            var options = {
                comment: false
            };

            ast = parseAST(source).first('multilineComment');

            assert.equal(undefined, lint(options, ast));
        });
    });
});
