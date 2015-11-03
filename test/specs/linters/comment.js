'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#comment()', function () {
        it('should not allow multi-line comments', function () {
            var source = '/* Hello world */';
            var result;
            var ast;

            var expected = [{
                message: "There shouldn't be any multi-line comments."
            }];

            ast = parseAST(source);
            ast = ast.first('multilineComment');

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow comments matching "allowed" option regexp', function () {
            var source = '/*! Hello world */';
            var result;
            var ast;

            var options = {
                allowed: '^!'
            };

            ast = parseAST(source);
            ast = ast.first('multilineComment');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });
    });
});
