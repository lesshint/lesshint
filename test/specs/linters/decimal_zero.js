'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#decimalZero()', function () {
        it('should allow number without decimal zero when "style" is "leading"', function () {
            var source = '.foo { font-size: 1em; }';
            var result;
            var ast;

            var options = {
                style: 'leading'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow number with leading decimal zero when "style" is "leading"', function () {
            var source = '.foo { font-size: 0.5em; }';
            var result;
            var ast;

            var options = {
                style: 'leading'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow number without leading decimal zero when "style" is "leading"', function () {
            var source = '.foo { font-size: .5em; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: '.5 should be written with leading zero.'
            }];

            var options = {
                style: 'leading'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow number without decimal when "style" is "trailing"', function () {
            var source = '.foo { font-size: 1em; }';
            var result;
            var ast;

            var options = {
                style: 'trailing'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow number without decimal when "style" is "trailing"', function () {
            var source = '.foo { font-size: 1em; }';
            var result;
            var ast;

            var options = {
                style: 'trailing'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow number with trailing decimal zero when "style" is "trailing"', function () {
            var source = '.foo { font-size: 1.0em; }';
            var result;
            var ast;

            var options = {
                style: 'trailing'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow number without trailing decimal zero when "style" is "trailing"', function () {
            var source = '.foo { font-size: 1.5em; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: '1.5 should be written with trailing zero.'
            }];

            var options = {
                style: 'trailing'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow number without trailing decimal zero when "style" is "both"', function () {
            var source = '.foo { font-size: 1.5em; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: '1.5 should be written with leading and trailing zero.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow number without leading decimal zero when "style" is "both"', function () {
            var source = '.foo { font-size: .50em; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: '.50 should be written with leading and trailing zero.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow number with trailing decimal zero when "style" is "none"', function () {
            var source = '.foo { font-size: .50em; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: '.50 should be written without leading and trailing zero.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow number with leading decimal zero when "style" is "none"', function () {
            var source = '.foo { font-size: 0.5em; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: '0.5 should be written without leading and trailing zero.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { font-size: 1.0em; }';
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
