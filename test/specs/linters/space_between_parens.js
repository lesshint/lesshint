'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: rgb( 255, 255, 255 ); }';
            var ast;
            var options = {
                spaceBetweenParens: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
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

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });
});
