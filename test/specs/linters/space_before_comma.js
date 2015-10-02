var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#spaceBeforeComma()', function () {
        it('should allow one space before comma when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow missing space before comma when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should be preceded by one space.'
            },
            {
                column: 24,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before comma when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255  ,255  ,255); }';
            var actual;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should be preceded by one space.'
            },
            {
                column: 28,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow a missing space before comma when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow one space before comma when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255 ,255 ,255); }';
            var actual;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should not be preceded by any space.'
            },
            {
                column: 27,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should not be preceded by any space.'
            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before comma when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255  ,255  ,255); }';
            var actual;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should not be preceded by any space.'
            },
            {
                column: 28,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should not be preceded by any space.'

            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow one space before comma in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow missing space before comma in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before comma in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin  ,@padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 15,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow a missing space before comma in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow one space before comma in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 15,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should not be preceded by any space.'
            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before comma in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin  ,@padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 15,
                line: 1,
                linter: 'spaceBeforeComma',
                message: 'Commas should not be preceded by any space.'
            }];

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report on operators other than commas when "style" is "no_space". See #49', function () {
            var source = '@var: (4 / 2);';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrules').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not report on operators other than commas when "style" is "one_space". See #49', function () {
            var source = '@var: (4/ 2);';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrules').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceBeforeComma: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;

            var options = {
                spaceBeforeComma: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
