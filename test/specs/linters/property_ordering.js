'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#propertyOrdering()', function () {
        it('should allow blocks with only one property', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            var options = {
                style: 'alpha'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should allow blocks with alphabetized properties', function () {
            var source = '.foo { color: red; padding-top: 4px; right: 5px}';
            var result;
            var ast;

            var options = {
                style: 'alpha'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should not allow blocks with non-alphabetized properties', function () {
            var source = '.foo { padding-top: 4px; color: red; right: 5px}';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 1,
                message: 'Property ordering is not alphabetized'
            }];

            var options = {
                style: 'alpha'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report identical property names. See #59', function () {
            var source = '.foo { color: red; color: blue; }';
            var result;
            var ast;

            var options = {
                style: 'alpha'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should not try to check variables', function () {
            var source = '.foo { @var: auto; }';
            var result;
            var ast;

            var options = {
                style: 'alpha'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should not try to check variables', function () {
            var source = '.foo { @var: auto; }';
            var result;
            var ast;

            var options = {
                style: 'alpha'
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);

            expect(result).to.equal(null);
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: red; color: blue; }';
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
