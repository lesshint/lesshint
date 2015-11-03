'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#emptyRule()', function () {
        it('should allow rules with declarations', function () {
            var source = '.foo { color: red; }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow empty rules', function () {
            var source = '.foo {}';
            var result;
            var ast;

            var expected = [{
                message: "There shouldn't be any empty rules present."
            }];

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow empty rules with a space', function () {
            var source = '.foo { }';
            var result;
            var ast;

            var expected = [{
                message: "There shouldn't be any empty rules present."
            }];

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow rules with only mixins (#16)', function () {
            var source = '.foo { .mixin(); }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first();

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });
    });
});
