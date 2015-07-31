var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceBetweenParens = require('../../../lib/linters/space_between_parens');

    describe('#spaceBetweenParens()', function () {
        it('should allow missing space after opening parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow missing space before closing parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow missing space after opening parenthesis and before closing parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should not allow one space after opening parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb( 255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow one space before closing parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255 ); }';
            var actual;
            var ast;

            var expected = [{
                column: 32,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow one space after opening parenthesis and before closing parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            },
            {
                column: 33,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(  255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before closing parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255  ); }';
            var actual;
            var ast;

            var expected = [{
                column: 32,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis and before closing parenthesis when "style" is "no_space"', function () {
            var source = '.foo { color: rgb(  255, 255, 255  ); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            },
            {
                column: 34,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space after opening parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow one space before closing parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow one space after opening parenthesis and before closing parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing space after opening parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255 ); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing space before closing parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb( 255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 30,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing space after opening parenthesis and before closing parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            },
            {
                column: 29,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(  255, 255, 255 ); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before closing parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb( 255, 255, 255  ); }';
            var actual;
            var ast;

            var expected = [{
                column: 33,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis and before closing parenthesis when "style" is "one_space"', function () {
            var source = '.foo { color: rgb(  255, 255, 255  ); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            },
            {
                column: 34,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow missing space after opening parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow missing space before closing parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow missing space after opening parenthesis and before closing parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should not allow one space after opening parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin( @margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow one space before closing parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin, @padding ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 25,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow one space after opening parenthesis and before closing parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin( @margin, @padding ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            },
            {
                column: 26,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin(  @margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before closing parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin(@margin, @padding  ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 25,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis and before closing parenthesis in mixins when "style" is "no_space"', function () {
            var source = '.mixin(  @margin, @padding  ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should not be followed by any space.'
            },
            {
                column: 27,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should not be preceded by any space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space after opening parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin( @margin, @padding ) {}';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow one space before closing parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin( @margin, @padding ) {}';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should allow one space after opening parenthesis and before closing parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin( @margin, @padding ) {}';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should not allow missing space after opening parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin, @padding ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing space before closing parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin( @margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 18,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing space after opening parenthesis and before closing parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            },
            {
                column: 17,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin(  @margin, @padding ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces before closing parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin( @margin, @padding  ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow multiple spaces after opening parenthesis and before closing parenthesis in mixins when "style" is "one_space"', function () {
            var source = '.mixin(  @margin, @padding  ) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Opening parenthesis should be followed by one space.'
            },
            {
                column: 27,
                line: 1,
                linter: 'spaceBetweenParens',
                message: 'Closing parenthesis should be preceded by one space.'
            }];

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector').first('simpleSelector').first('parentheses');

            actual = spaceBetweenParens({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var ast;
            var options = {
                spaceBetweenParens: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var ast;
            var options = {
                spaceBetweenParens: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, spaceBetweenParens({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var ast;

            var options = {
                spaceBetweenParens: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.throws(spaceBetweenParens.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
