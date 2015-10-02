var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#spaceAfterPropertyValue()', function () {
        it('should allow a missing space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow any space when "style" is "no_space"', function () {
            var source = '.foo { color: red ; }';
            var actual;
            var ast;

            var expected = [{
                column: 18,
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should not be preceded by any space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color: red ; }';
            var ast;

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow a missing space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should be preceded by one space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow any space on multiple property values when "style" is "no_space"', function () {
            var source = '.foo { color: red ; margin-right: 10px ; }';
            var actual;
            var ast;

            var expected = [{
                column: 18,
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should not be preceded by any space.',
            },
            {
                column: 39,
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should not be preceded by any space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow a missing space on multiple property values when "style" is "one_space"', function () {
            var source = '.foo { color: red; margin-right: 10px; }';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should be preceded by one space.'
            },
            {
                column: 20,
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should be preceded by one space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: red ; }';
            var ast;
            var options = {
                spaceAfterPropertyValue: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: red ; }';
            var ast;
            var options = {
                spaceAfterPropertyValue: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: red ; }';
            var ast;
            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
