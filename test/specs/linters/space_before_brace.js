'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceBeforeBrace()', function () {
        it('should have the proper node types', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow no space when "style" is "no_space"', function () {
            const source = '.foo{}';
            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow one space when "style" is "no_space"', function () {
            const source = '.foo {}';
            const expected = [{
                column: 6,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple spaces when "style" is "no_space"', function () {
            const source = '.foo  {}';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow one new line when "style" is "no_space"', function () {
            const source = '.foo\n{}';
            const expected = [{
                column: 1,
                line: 2,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple new lines when "style" is "no_space"', function () {
            const source = '.foo\n\n{}';
            const expected = [{
                column: 1,
                line: 3,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one space when "style" is "one_space"', function () {
            const source = '.foo {}';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing space when "style" option is "one_space"', function () {
            const source = '.foo{}';
            const expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one space when multiple simple selectors are used and "style" is "one_space"', function () {
            const source = '.foo, .bar {}';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing space when multiple simple selectors are used and "style" is "one_space"', function () {
            const source = '.foo, .bar{}';
            const expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple spaces when "style" is "one_space"', function () {
            const source = '.foo  {}';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow new line when "style" is "one_space"', function () {
            const source = '.foo, .bar\n{}';
            const expected = [{
                column: 1,
                line: 2,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow tab when "style" is "one_space"', function () {
            const source = '.foo, .bar\t{}';
            const expected = [{
                column: 12,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple spaces when multiple simple selectors are used and "style" is "one_space"', function () {
            const source = '.foo, .bar  {}';
            const expected = [{
                column: 13,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one new line when "style" is "new_line"', function () {
            const source = '.foo\n{}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line when a selector group is used and "style" is "new_line"', function () {
            const source = '.foo, .bar\n{}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line followed by spaces when "style" is "new_line"', function () {
            const source = '.foo\n       {}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line preceded by spaces when "style" is "new_line"', function () {
            const source = '.foo       \n{}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line surrounded by spaces when "style" is "new_line"', function () {
            const source = '.foo       \n       {}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line followed by tabs when "style" is "new_line"', function () {
            const source = '.foo\n\t\t{}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line preceded by tabs when "style" is "new_line"', function () {
            const source = '.foo\t\t\n{}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line surrounded by tabs when "style" is "new_line"', function () {
            const source = '.foo\t\t\n\t\t{}';
            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow multiple new lines when "style" is "new_line"', function () {
            const source = '.foo\n\n{}';
            const expected = [{
                column: 1,
                line: 3,
                message: 'Opening curly brace should be on its own line.'
            }];

            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple new lines when a selector group is used and "style" is "new_line"', function () {
            const source = '.foo, .bar\n\n{}';
            const expected = [{
                column: 1,
                line: 3,
                message: 'Opening curly brace should be on its own line.'
            }];

            const options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check mixins', function () {
            const source = '.foo(){}';
            const expected = [{
                column: 7,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check media queries', function () {
            const source = '@media screen and (max-width: 480px){}';
            const expected = [{
                column: 37,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check nested media queries', function () {
            const source = '.class { color: red; @media screen and (max-width: 480px){} }';
            const expected = [{
                column: 58,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first.next());

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not throw on atrule use', function () {
            const source = '.header-def(@rules) {h1,h2,h3,h4,h5,h6 {\n@rules();}}';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore nodes without a following block', function () {
            const source = '.foo();';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore atrule nodes without a following block', function () {
            const source = '@foo();';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should report the correct line on multi-line selectors (#231)', function () {
            const source = '.foo,\n.bar  { color: red; }';

            const expected = [{
                column: 7,
                line: 2,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should throw on invalid "style" value', function () {
            const source = '.foo{}';
            const options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                const lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
