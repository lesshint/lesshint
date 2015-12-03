'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#importantRule()', function () {
        it('should not do anything when there is no !important present', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow !important', function () {
            var source = '.foo { color: red !important; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: '!important should not be used.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
