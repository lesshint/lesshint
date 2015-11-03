var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('spaceAroundComma → linter', function () {

        //
        // General
        //

        it('should return undefined when disabled', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(undefined, lint(options, ast));
        });

        it('should return undefined when disabled via shorthand', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceAroundComma: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(undefined, lint(options, ast));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'invalid'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.throws(lint.bind(null, options, ast), Error);
        });
    });

    describe('spaceAroundComma → style: after', function () {

        //
        // Space After Comma
        //

        it('should allow one space after comma when "style" is "after"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'after'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow missing space after comma when "style" is "after"', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var actual;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be followed by one space.'
            },
            {
                column: 27,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'after'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow one space after comma in mixins when "style" is "after"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'after'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow missing space after comma in mixins when "style" is "after"', function () {
            var source = '.mixin(@margin,@padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'after'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report on operators other than commas when "style" is "after". See #49', function () {
            var source = '@var: (4 /2);';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'after'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });
    });

    describe('spaceAroundComma → style: before', function () {

        //
        // Space Before Comma
        //

        it('should allow one space before comma when "style" is "before"', function () {
            var source = '.foo { color: rgb(255 ,255 ,255); }';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'before'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(undefined, lint(options, ast));
        });

        it('should not allow missing space before comma when "style" is "before"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded by one space.'
            },
            {
                column: 24,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'before'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow one space before comma in mixins when "style" is "before"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'before'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow missing space before comma in mixins when "style" is "before"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'before'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report on operators other than commas when "style" is "before". See #49', function () {
            var source = '@var: (4/ 2);';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'before'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });
    });

    describe('spaceAroundComma → style: both', function () {

        //
        // Space Before and After Comma
        //

        it('should allow one space before and after comma when "style" is "both"', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'both'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(undefined, lint(options, ast));
        });

        it('should not allow missing space before comma when "style" is "both"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded and followed by one space.'
            },
            {
                column: 24,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'both'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing space after comma when "style" is "both"', function () {
            var source = '.foo { color: rgb(255 ,255 ,255); }';
            var actual;
            var ast;

            var expected = [{
                column: 24,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded and followed by one space.'
            },
            {
                column: 29,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'both'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow one space before and after comma in mixins when "style" is "both"', function () {
            var source = '.mixin(@margin , @padding) {}';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'both'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow missing space before comma in mixins when "style" is "both"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'both'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow missing space after comma in mixins when "style" is "both"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 17,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'both'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report on operators other than commas when "style" is "both". See #49', function () {
            var source = '@var: (4 / 2);';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'both'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });
    });

    describe('spaceAroundComma → style: none', function () {

        //
        // No Spaces
        //

        it('should not allow a missing space before comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            var expected = [{
                column: 23,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            },
            {
                column: 28,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.deepEqual(expected, lint(options, ast));
        });

        it('should not allow one space before comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255 ,255 ,255); }';
            var actual;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            },
            {
                column: 27,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow a missing space before comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            var expected = [{
                column: 16,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.deepEqual(expected, lint(options, ast));
        });

        it('should not allow one space before comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 15,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report on operators other than commas when "style" is "none". See #49', function () {
            var source = '@var: (4 / 2);';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not report on operators other than commas when "style" is "one_space". See #49', function () {
            var source = '@var: (4/ 2);';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow a missing space after comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            assert.equal(undefined, lint(options, ast));
        });

        it('should not allow one space after comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var actual;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            },
            {
                column: 28,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow a missing space after comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin,@padding) {}';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            assert.equal(undefined, lint(options, ast));
        });

        it('should not allow one space after comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var actual;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                linter: 'spaceAroundComma',
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not report on operators other than commas when "style" is "none". See #49', function () {
            var source = '@var: (4 / 2);';
            var ast;
            var options = {
                spaceAroundComma: {
                    enabled: true,
                    style: 'none'
                }
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            assert.strictEqual(undefined, lint(options, ast));
        });
    });
});
