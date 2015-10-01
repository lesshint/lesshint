var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#finalNewline()', function () {
        it('should allow files with final new lines', function () {
            var source = '.foo {}\n';
            var ast;

            var options = {
                finalNewline: {
                    enabled: true
                }
            };

            ast = parseAST(source);

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow files without final new lines', function () {
            var source = '.foo {}';
            var actual;
            var ast;

            var expected = [{
                column: 0,
                line: 1,
                linter: 'finalNewline',
                message: 'Files should end with a newline.'
            }];

            var options = {
                finalNewline: {
                    enabled: true
                }
            };

            ast = parseAST(source);

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                finalNewline: {
                    enabled: false
                }
            };

            ast = parseAST(source);

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo {}';
            var ast;
            var options = {
                finalNewline: false
            };

            ast = parseAST(source);

            assert.equal(null, lint(options, ast));
        });
    });
});
