'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#hexNotation()', function () {
        it('should not allow uppercase hex values when "style" is "lowercase"', function () {
            var source = 'color: #AABBCC;';
            var result;
            var ast;

            var expected = [{
                message: '#AABBCC should be written in lowercase.'
            }];

            var options = {
                style: 'lowercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow lowercase hex values when "style" is "lowercase"', function () {
            var source = 'color: #aabbcc;';
            var result;
            var ast;

            var options = {
                style: 'lowercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow lowercase hex values when "style" is "uppercase"', function () {
            var source = 'color: #aabbcc;';
            var result;
            var ast;

            var expected = [{
                message: '#aabbcc should be written in uppercase.'
            }];

            var options = {
                style: 'uppercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow uppercase hex values when "style" is "uppercase"', function () {
            var source = 'color: #AABBCC;';
            var result;
            var ast;

            var options = {
                style: 'uppercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should find hex values in background declarations', function () {
            var source = 'background: url(test.png) no-repeat #AABBCC;';
            var result;
            var ast;

            var expected = [{
                message: '#AABBCC should be written in lowercase.'
            }];

            var options = {
                style: 'lowercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow uppercase hex values in variables when "style" is "lowercase" (#28)', function () {
            var source = '@color: #AABBCC;';
            var result;
            var ast;

            var expected = [{
                message: '#AABBCC should be written in lowercase.'
            }];

            var options = {
                style: 'lowercase'
            };

            ast = parseAST(source);
            ast = ast.first().first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow lowercase hex values in variables when "style" is "uppercase" (#28)', function () {
            var source = '@color: #aabbcc;';
            var result;
            var ast;

            var expected = [{
                message: '#aabbcc should be written in uppercase.'
            }];

            var options = {
                style: 'uppercase'
            };

            ast = parseAST(source);
            ast = ast.first().first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should ignore colors with only numbers', function () {
            var source = 'color: #123456;';
            var result;
            var ast;

            var options = {
                style: 'lowercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should ignore colors with invalid length', function () {
            var source = 'color: #abc1;';
            var result;
            var ast;

            var options = {
                style: 'lowercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should ignore colors with invalid characters', function () {
            var source = 'color: #abck;';
            var result;
            var ast;

            var options = {
                style: 'lowercase'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should throw on invalid "style" value', function () {
            var source = 'color: #aabbcc;';
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
