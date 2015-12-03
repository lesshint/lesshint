'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#singleLinePerSelector()', function () {
        it('should allow selectors on separate lines', function () {
            var source = '.foo, \n.bar {}';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first('ruleset');

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow multiple selectors on the same line', function () {
            var source = '.foo, .bar {}';
            var result;
            var ast;

            var expected = [{
                column: 6,
                line: 1,
                message: 'Each selector should be on its own line.'
            }];

            ast = parseAST(source);
            ast = ast.first('ruleset');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
