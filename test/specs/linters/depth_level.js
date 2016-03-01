'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#depthLevel()', function () {
        it('should not allow styles nested with more than 3 levels of depth.', function () {
            var source = '.foo { color: red; .foo-2 { color: red; .foo-3 { width: 100%; .foo-4 { height: 100%; } } } }';
            var result;
            var ast;

            var expected = [{
                message: "There shouldn't be more than '3' levels deep from the style's parent, check the children's depth."
            }];

            var options = {
                depth: 3
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);
            expect(result).to.deep.equal(expected);
        });

        it('should allow styles nested with less than 4 levels of depth.', function () {
            var source = '.foo { color: red; .foo-2 { color: red; .foo-3 { width: 100%; } } }';
            var result;
            var ast;

            var options = {
                depth: 3
            };

            ast = parseAST(source);
            ast = ast.first().first('block');

            result = linter.lint(options, ast);
            expect(result).to.be.undefined;
        });
    });

});
