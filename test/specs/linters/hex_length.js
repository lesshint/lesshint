'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#hexLength()', function () {
        it('should not allow short hand hex values when "style" is "long"', function () {
            var source = 'color: #ABC;';
            var result;
            var ast;

            var expected = [{
                message: '#ABC should be written in the long-form format.'
            }];

            var options = {
                style: 'long'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow longhand hex values when "style" is "long"', function () {
            var source = 'color: #AABBCC;';
            var result;
            var ast;

            var options = {
                style: 'long'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow longhand hex values when "style" is "short"', function () {
            var source = 'color: #AABBCC;';
            var result;
            var ast;

            var expected = [{
                message: '#AABBCC should be written in the short-form format.'
            }];

            var options = {
                style: 'short'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow short hand hex values when "style" is "short"', function () {
            var source = 'color: #ABC;';
            var result;
            var ast;

            var options = {
                style: 'short'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow longhand hex values can can be written with a shorthand when "style" is "short"', function () {
            var source = 'color: #4B7A19;';
            var result;
            var ast;

            var options = {
                style: 'short'
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
                message: '#AABBCC should be written in the short-form format.'
            }];

            var options = {
                style: 'short'
            };

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow short hand hex values in variables when "style" is "long" (#28)', function () {
            var source = '@color: #ABC;';
            var result;
            var ast;

            var expected = [{
                message: '#ABC should be written in the long-form format.'
            }];

            var options = {
                style: 'long'
            };

            ast = parseAST(source);
            ast = ast.first().first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow longhand hex values in variables when "style" is "short" (#28)', function () {
            var source = '@color: #AABBCC;';
            var result;
            var ast;

            var expected = [{
                message: '#AABBCC should be written in the short-form format.'
            }];

            var options = {
                style: 'short'
            };

            ast = parseAST(source);
            ast = ast.first().first('color');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should ignore invalid colors', function () {
            var source = 'color: #abc1;';
            var result;
            var ast;

            var options = {
                style: 'long'
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
