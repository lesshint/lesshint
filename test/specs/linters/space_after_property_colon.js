var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#spaceAfterPropertyColon()', function () {
        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not tolerate missing space when "style" is "one_space"', function () {
            var source = '.foo { color:red; }';
            var actual;
            var ast;

            var expected = [{
                column: 14,
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.'
            }];

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not tolerate more than one space when "style" is "one_space"', function () {
            var source = '.foo { color:  red; }';
            var actual;
            var ast;

            var expected = [{
                column: 14,
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.'
            }];

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow any space when "style" is "no_space"', function () {
            var source = '.foo { color:red; }';
            var ast;

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not tolerate one space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 14,
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should not be followed by any spaces.'
            }];

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not tolerate any space when "style" is "no_space"', function () {
            var source = '.foo { color:  red; }';
            var actual;
            var ast;

            var expected = [{
                column: 14,
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should not be followed by any spaces.'
            }];

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyColon: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyColon: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyColon: {
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
