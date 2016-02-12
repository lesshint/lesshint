'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#validateIndentation()', function () {
        it('should allow blocks with correct indentation', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            source += '.foo {\n';
            source += '    color: red;\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow blocks with incorrectly indented declarations', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 2,
                message: 'Expected an indentation of 4 but found 0.'
            }];

            source += '.foo {\n';
            source += 'color: red;\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow blocks with incorrectly indented extends', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 2,
                message: 'Expected an indentation of 4 but found 0.'
            }];

            source += '.foo {\n';
            source += '&:extend(.bar);\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow blocks with incorrectly indented media queries', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 2,
                message: 'Expected an indentation of 4 but found 0.'
            }];

            source += '.foo {\n';
            source += '@media (all) {}\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow blocks with incorrectly indented mixins', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 2,
                message: 'Expected an indentation of 4 but found 0.'
            }];

            source += '.foo {\n';
            source += '.bar()\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow correctly indented nested blocks', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            source += '.foo {\n';
            source += '    @media (all) {\n';
            source += '        .bar();\n';
            source += '    }\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow incorrectly indented nested blocks', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 3,
                message: 'Expected an indentation of 8 but found 4.'
            }];

            source += '.foo {\n';
            source += '    @media (all) {\n';
            source += '    .bar();\n';
            source += '    }\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow an incorrectly indented closing bracket', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 3,
                message: 'Expected an indentation of 0 but found 4.'
            }];

            source += '.foo {\n';
            source += '    color: red;\n';
            source += '    }';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should now allow mixed tabs and spaces', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 2,
                message: 'Mixed tabs and spaces.'
            }];

            source += '.foo {\n';
            source += '\t  color: red;\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow tabs when "style" is "spaces"', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                size: 4,
                style: 'spaces'
            };

            var expected = [{
                column: 0,
                line: 2,
                message: 'Indentation should use spaces.'
            }];

            source += '.foo {\n';
            source += '\tcolor: red;\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow spaces when "style" is "tabs"', function () {
            var source = '';
            var result;
            var ast;

            var options = {
                style: 'tabs'
            };

            var expected = [{
                column: 0,
                line: 2,
                message: 'Indentation should use tabs.'
            }];

            source += '.foo {\n';
            source += '  color: red;\n';
            source += '}';

            ast = parseAST(source);
            ast = ast.first('ruleset').first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
