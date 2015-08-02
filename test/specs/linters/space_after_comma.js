var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceAfterComma = require('../../../lib/linters/space_after_comma');

    describe('#spaceAfterComma()', function () {
        it('should allow one space after comma when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var ast;
            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceAfterComma({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing space after comma when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var actual;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should be followed by one space.'
            },
            {
                column: 27,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after comma when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255,  255,  255); }';
            var actual;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should be followed by one space.'
            },
            {
                column: 29,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow a missing space after comma when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var ast;
            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceAfterComma({
                config: options,
                node: ast
            }));
        });

        it('should not allow one space after comma when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should not be followed by any space.'
            },
            {
                column: 28,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should not be followed by any space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after comma when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255,  255,  255); }';
            var actual;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should not be followed by any space.'
            },
            {
                column: 29,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should not be followed by any space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space after comma in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var ast;
            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceAfterComma({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing space after comma in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin,@padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after comma in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin,  @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow a missing space after comma in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin,@padding) {}';
            var ast;
            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceAfterComma({
                config: options,
                node: ast
            }));
        });

        it('should not allow one space after comma in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should not be followed by any space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after comma in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin,  @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'spaceAfterComma',
                message: 'Commas should not be followed by any space.'
            }];

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceAfterComma({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var ast;
            var options = {
                spaceAfterComma: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceAfterComma({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var ast;
            var options = {
                spaceAfterComma: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceAfterComma({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var ast;

            var options = {
                spaceAfterComma: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.throws(spaceAfterComma.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
