'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#hexValidation()', function () {
        it('should allow valid hex values', function () {
            var source = 'color: #AABBCC;';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow invalid hex values', function () {
            var source = 'color: #AABBC;';
            var result;
            var ast;

            var expected = [{
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should find invalid hex values in background declarations', function () {
            var source = 'background: url(test.png) no-repeat #AABBC;';
            var result;
            var ast;

            var expected = [{
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            ast = parseAST(source);
            ast = ast.first('declaration').first('value').first('color');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow invalid hex values in variable declarations (#28)', function () {
            var source = '@color: #AABBC;';
            var result;
            var ast;

            var expected = [{
                message: 'Hexadecimal color "#AABBC" should be either three or six characters long.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('color');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
