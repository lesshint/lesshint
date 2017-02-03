'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#singleLinePerProperty()', function () {
        it('should have the proper node types', function () {
            const source = '.foo {\n color: red; \n margin-right: 10px; \n}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow properties on separate lines', function () {
            const source = '.foo {\n color: red; \n margin-right: 10px; \n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow multiple properties on the same line', function () {
            const source = '.foo {\n color: red; margin-right: 10px; \n}';
            const expected = [
                {
                    column: 2,
                    line: 2,
                    message: 'Each property should be on its own line.'
                },
                {
                    column: 14,
                    line: 2,
                    message: 'Each property should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow sole property in single-line block (spaces between braces)', function () {
            const source = '.foo { color: red; }';
            const expected = [{
                column: 8,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow sole property in single-line block (no spaced between braces)', function () {
            const source = '.foo {color: red;}';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow mixins on separate lines', function () {
            const source = '.foo {\n.mixin(); \n.mixin2(); \n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single mixin in single-line block', function () {
            const source = '.foo {.mixin();}';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow variables on separate lines', function () {
            const source = '.foo {\n@var1: 10px; \n@var2: 20px; \n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single variable in single-line block', function () {
            const source = '.foo {@var1: 10px;}';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow detached rulessets on separate lines', function () {
            const source = '.foo {\n@ruleset1(); \n@ruleset2(); \n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single detached ruleset in single-line block', function () {
            const source = '.foo {@ruleset();}';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow opening brace on the same line as a property', function () {
            const source = '.foo { color: red; \n margin-right: 10px; \n}';
            const expected = [{
                column: 8,
                line: 1,
                message: 'Each property should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow closing brace on the same line as a property', function () {
            const source = '.foo {\n color: red; \n margin-right: 10px; }';
            const expected = [{
                column: 2,
                line: 3,
                message: 'Each property should be on its own line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should return undefined with single-line comment after property definition', function () {
            const source = '.foo {\n color: red;\n margin-right: 10px; // inline comment\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should return undefined with single-line comment immediately after property definition', function () {
            const source = '.foo {\n color: red;\n margin-right: 10px;// inline comment\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should return undefined with one-line, multi-line comment after property definition', function () {
            const source = '.foo {\n color: red;\n margin-right: 10px; /* inline comment */\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should return undefined with one-line, multi-line comment immediately after property definition', function () {
            const source = '.foo {\n color: red;\n margin-right: 10px;/* inline comment */\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single-line, inline comment after multiple definitions in same line', function () {
            const source = '.foo {\n color: red; margin-right: 10px; // inline comment\n}';
            const expected = [
                {
                    column: 2,
                    line: 2,
                    message: 'Each property should be on its own line.'
                },
                {
                    column: 14,
                    line: 2,
                    message: 'Each property should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow one-line, multi-line comment after multiple definitions in same line', function () {
            const source = '.foo {\n color: red; margin-right: 10px; /* inline comment */\n}';
            const expected = [
                {
                    column: 2,
                    line: 2,
                    message: 'Each property should be on its own line.'
                },
                {
                    column: 14,
                    line: 2,
                    message: 'Each property should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not report nested media queries', function () {
            const source = 'section {\n@media (min-width: 300px) {\nfont-size: inherit;\n}\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('shoud not report declarations without a trailing semicolon', function () {
            const source = '.foo {\ncolor: red\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report "chained" mixins. #110', function () {
            const source = '.foo {\n.bar.baz();\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report mixins without a trailing semicolon. #132', function () {
            const source = '.foo {\n .bar\n}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check mixin calls', function () {
            const source = '.mixin();';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check each rule on its own', function () {
            let source = '';

            source += '.foo {\n';
            source += '    margin-bottom: 0;\n';
            source += '}\n';
            source += '.bar {\n';
            source += '    height: auto;\n';
            source += '}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single line rules when "allowSingleLineRules" is "true"', function () {
            const source = '.foo { color: red; }';
            const options = {
                allowSingleLineRules: true
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow single line rules when "allowSingleLineRules" is "false"', function () {
            const source = '.foo { color: red; }';
            const options = {
                allowSingleLineRules: false
            };

            const expected = [
                {
                    column: 8,
                    line: 1,
                    message: 'Each property should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow single line rules with multiple declarations when "allowSingleLineRules" is "true"', function () {
            const source = '.foo { color: red; margin-right: 10px; }';
            const options = {
                allowSingleLineRules: true
            };

            const expected = [
                {
                    column: 8,
                    line: 1,
                    message: 'Each property should be on its own line.'
                },
                {
                    column: 20,
                    line: 1,
                    message: 'Each property should be on its own line.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
