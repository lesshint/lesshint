'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#singleLinePerProperty()', function () {
        it('should allow properties on separate lines', function () {
            var source = '.foo {\n color: red; \n margin-right: 10px; \n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow multiple properties on the same line', function () {
            var source = '.foo {\n color: red; margin-right: 10px; \n}';
            var result;
            var ast;

            var expected = [{
                column: 2,
                line: 2,
                message: 'Each property should be on its own line.'
            },
            {
                column: 14,
                line: 2,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow sole property in single-line block (spaces between braces)', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow sole property in single-line block (no spaced between braces)', function () {
            var source = '.foo {color: red;}';
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow mixins on separate lines', function () {
            var source = '.foo {\n.mixin(); \n.mixin2(); \n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow single mixin in single-line block', function () {
            var source = '.foo {.mixin();}';
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow variables on separate lines', function () {
            var source = '.foo {\n@var1: 10px; \n@var2: 20px; \n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow single variable in single-line block', function () {
            var source = '.foo {@var1: 10px;}';
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow detached rulessets on separate lines', function () {
            var source = '.foo {\n@ruleset1(); \n@ruleset2(); \n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow single detached ruleset in single-line block', function () {
            var source = '.foo {@ruleset();}';
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow opening brace on the same line as a property', function () {
            var source = '.foo { color: red; \n margin-right: 10px; \n}';
            var result;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow closing brace on the same line as a property', function () {
            var source = '.foo {\n color: red; \n margin-right: 10px; }';
            var result;
            var ast;

            var expected = [{
                column: 2,
                line: 3,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should return undefined with single-line comment after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px; // inline comment\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should return undefined with single-line comment immediately after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px;// inline comment\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should return undefined with one-line, multi-line comment after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px; /* inline comment */\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should return undefined with one-line, multi-line comment immediately after property definition', function () {
            var source = '.foo {\n color: red;\n margin-right: 10px;/* inline comment */\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow single-line, inline comment after multiple definitions in same line', function () {
            var source = '.foo {\n color: red; margin-right: 10px; // inline comment\n}';
            var result;
            var ast;

            var expected = [{
                column: 2,
                line: 2,
                message: 'Each property should be on its own line.'
            },
            {
                column: 14,
                line: 2,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow one-line, multi-line comment after multiple definitions in same line', function () {
            var source = '.foo {\n color: red; margin-right: 10px; /* inline comment */\n}';
            var result;
            var ast;

            var expected = [{
                column: 2,
                line: 2,
                message: 'Each property should be on its own line.'
            },
            {
                column: 14,
                line: 2,
                message: 'Each property should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report nested media queries', function () {
            var source = 'section {\n@media (min-width: 300px) {\nfont-size: inherit;\n}\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('shoud not report declarations without a trailing semicolon', function () {
            var source = '.foo {\ncolor: red\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not report "chained" mixins. #110', function () {
            var source = '.foo {\n.bar.baz();\n}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });
    });
});
