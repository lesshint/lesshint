var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceBeforeComma = require('../../../lib/linters/space_before_comma');

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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBeforeComma({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBeforeComma({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBeforeComma({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBeforeComma({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBeforeComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceBeforeComma: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBeforeComma({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceBeforeComma: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBeforeComma({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.throws(spaceBeforeComma.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
