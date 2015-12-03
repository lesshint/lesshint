'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#spaceAfterPropertyValue()', function () {
        it('should allow a missing space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow any space when "style" is "no_space"', function () {
            var source = '.foo { color: red ; }';
            var result;
            var ast;

            var expected = [{
                column: 18,
                line: 1,
                message: 'Semicolon after property value should not be preceded by any space.'
            }];

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color: red ; }';
            var result;
            var ast;

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow a missing space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                message: 'Semicolon after property value should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow any space on multiple property values when "style" is "no_space"', function () {
            var source = '.foo { color: red ; margin-right: 10px ; }';
            var result;
            var ast;

            var expected = [{
                column: 18,
                line: 1,
                message: 'Semicolon after property value should not be preceded by any space.',
            },
            {
                column: 39,
                line: 1,
                message: 'Semicolon after property value should not be preceded by any space.'
            }];

            var options = {
                style: 'no_space'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow a missing space on multiple property values when "style" is "one_space"', function () {
            var source = '.foo { color: red; margin-right: 10px; }';
            var result;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                message: 'Semicolon after property value should be preceded by one space.'
            },
            {
                column: 20,
                line: 1,
                message: 'Semicolon after property value should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: red ; }';
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
