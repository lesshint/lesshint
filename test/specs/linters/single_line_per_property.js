var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    var errorMessage = 'Each property should be on its own line.';

    describe('#singleLinePerProperty()', function () {
        it('should allow properties on separate lines', function () {
            var source = '.foo {\n color: red; \n margin-right: 10px; \n}';
            var ast;

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow multiple properties on the same line', function () {
            var source = '.foo {\n color: red; margin-right: 10px; \n}';
            var actual;
            var ast;

            var expected = [{
                column: 2,
                line: 2,
                linter: 'singleLinePerProperty',
                message: errorMessage
            },
            {
                column: 14,
                line: 2,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow sole property in single-line block (spaces between braces)', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow sole property in single-line block (no spaced between braces)', function () {
            var source = '.foo {color: red;}';
            var actual;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow opening brace on the same line as a property', function () {
            var source = '.foo { color: red; \n margin-right: 10px; \n}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow closing brace on the same line as a property', function () {
            var source = '.foo {\n color: red; \n margin-right: 10px; }';
            var actual;
            var ast;

            var expected = [{
                column: 2,
                line: 3,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: red; margin-right: 10px; }';
            var ast;
            var options = {
                singleLinePerProperty: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: red; margin-right: 10px; }';
            var ast;
            var options = {
                singleLinePerProperty: false
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null with single-line comment after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px; // inline comment\n}';
            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null with single-line comment immediately after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px;// inline comment\n}';
            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null with one-line, multi-line comment after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px; /* inline comment */\n}';
            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should return null with one-line, multi-line comment immediately after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px;/* inline comment */\n}';
            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, lint(options, ast));
        });

        it('should not allow single-line, inline comment after multiple definitions in same line', function () {
            var source = '.foo {\n color: red; margin-right: 10px; // inline comment\n}';
            var actual;
            var ast;

            var expected = [{
                column: 2,
                line: 2,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }, {
                column: 14,
                line: 2,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow one-line, multi-line comment after multiple definitions in same line', function () {
            var source = '.foo {\n color: red; margin-right: 10px; /* inline comment */\n}';
            var actual;
            var ast;

            var expected = [{
                column: 2,
                line: 2,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }, {
                column: 14,
                line: 2,
                linter: 'singleLinePerProperty',
                message: errorMessage
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });
    });
});
