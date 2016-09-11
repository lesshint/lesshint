'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceBeforeBrace()', function () {
        it('should have the proper node types', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow no space when "style" is "no_space"', function () {
            var source = '.foo{}';
            var options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow one space when "style" is "no_space"', function () {
            var source = '.foo {}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple spaces when "style" is "no_space"', function () {
            var source = '.foo  {}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow one new line when "style" is "no_space"', function () {
            var source = '.foo\n{}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple new lines when "style" is "no_space"', function () {
            var source = '.foo\n\n{}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo {}';
            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing space when "style" option is "one_space"', function () {
            var source = '.foo{}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one space when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar {}';
            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing space when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar{}';
            var expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple spaces when "style" is "one_space"', function () {
            var source = '.foo  {}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple spaces when "style" is "one_space"', function () {
            var source = '.foo  {}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow new line when "style" is "one_space"', function () {
            var source = '.foo, .bar\n{}';
            var expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow tab when "style" is "one_space"', function () {
            var source = '.foo, .bar\t{}';
            var expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple spaces when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar  {}';
            var expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one new line when "style" is "new_line"', function () {
            var source = '.foo\n{}';
            var options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line when a selector group is used and "style" is "new_line"', function () {
            var source = '.foo, .bar\n{}';
            var options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line followed by spaces when "style" is "new_line"', function () {
            var source = '.foo\n       {}';
            var options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one new line followed by tabs when "style" is "new_line"', function () {
            var source = '.foo\n\t\t{}';
            var options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow multiple new lines when "style" is "new_line"', function () {
            var source = '.foo\n\n{}';
            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should be on its own line.'
            }];

            var options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple new lines when a selector group is used and "style" is "new_line"', function () {
            var source = '.foo, .bar\n\n{}';
            var expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be on its own line.'
            }];

            var options = {
                style: 'new_line'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check mixins', function () {
            var source = '.foo(){}';
            var expected = [{
                column: 7,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check media queries', function () {
            var source = '@media screen and (max-width: 480px){}';
            var expected = [{
                column: 37,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should check nested media queries', function () {
            var source = '.class { color: red; @media screen and (max-width: 480px){} }';
            var expected = [{
                column: 58,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first.next());

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not throw on atrule use', function () {
            var source = '.header-def(@rules) {h1,h2,h3,h4,h5,h6 {\n@rules();}}';
            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check imports', function () {
            var source = '@import \'lib/colors\';';
            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore nodes without a following block', function () {
            var source = '.foo();';
            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore atrule nodes without a following block', function () {
            var source = '@foo();';
            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo{}';
            var options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                var lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
