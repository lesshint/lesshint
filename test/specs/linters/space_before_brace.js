'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#spaceBeforeBrace()', function () {
        it('should allow no space when "style" is "no_space"', function () {
            var source = '.foo{}';
            var result;
            var ast;

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow one space when "style" is "no_space"', function () {
            var source = '.foo {}';
            var result;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow multiple spaces when "style" is "no_space"', function () {
            var source = '.foo  {}';
            var result;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow one new line when "style" is "no_space"', function () {
            var source = '.foo\n{}';
            var result;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow multiple new lines when "style" is "no_space"', function () {
            var source = '.foo\n\n{}';
            var result;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should not be preceded by a space or new line.'
            }];

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo {}';
            var result;
            var ast;

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space when "style" option is "one_space"', function () {
            var source = '.foo{}';
            var result;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow one space when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar {}';
            var result;
            var ast;

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar{}';
            var result;
            var ast;

            var expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow multiple spaces when "style" is "one_space"', function () {
            var source = '.foo  {}';
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow multiple spaces when multiple simple selectors are used and "style" is "one_space"', function () {
            var source = '.foo, .bar  {}';
            var result;
            var ast;

            var expected = [{
                column: 13,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow one new line when "style" is "new_line"', function () {
            var source = '.foo\n{}';
            var result;
            var ast;

            var options = {
                style: 'new_line'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow one new line when a selector group is used and "style" is "new_line"', function () {
            var source = '.foo, .bar\n{}';
            var result;
            var ast;

            var options = {
                style: 'new_line'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow multiple new lines when "style" is "new_line"', function () {
            var source = '.foo\n\n{}';
            var result;
            var ast;

            var expected = [{
                column: 5,
                line: 1,
                message: 'Opening curly brace should be on its own line.'
            }];

            var options = {
                style: 'new_line'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow multiple new lines when a selector group is used and "style" is "new_line"', function () {
            var source = '.foo, .bar\n\n{}';
            var result;
            var ast;

            var expected = [{
                column: 11,
                line: 1,
                message: 'Opening curly brace should be on its own line.'
            }];

            var options = {
                style: 'new_line'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should check mixins', function () {
            var source = '.foo(){}';
            var result;
            var ast;

            var expected = [{
                column: 7,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should check media queries', function () {
            var source = '@media screen and (max-width: 480px){}';
            var result;
            var ast;

            var expected = [{
                column: 37,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first('atrule');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should check nested media queries', function () {
            var source = '.class { color: red; @media screen and (max-width: 480px){} }';
            var result;
            var ast;

            var expected = [{
                column: 58,
                line: 1,
                message: 'Opening curly brace should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('atrule');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should ignore nodes without a following block', function () {
            var source = '.foo();';
            var result;
            var ast;

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first('mixin');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo{}';
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);
            ast = ast.first();

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
