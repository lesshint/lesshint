'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#depthLevel()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { color: red; .foo-2 { color: red; .foo-3 { width: 100%; } } }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow styles nested with more than 3 levels of depth.', function () {
            const source = '.foo { color: red; .foo-2 { color: red; .foo-3 { width: 100%; .foo-4 { height: 100%; } } } }';
            const expected = [{
                message: "There shouldn't be more than '3' levels deep from the style's parent, check the children's depth."
            }];

            const options = {
                depth: 3
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow styles nested with less than 4 levels of depth.', function () {
            const source = '.foo { color: red; .foo-2 { color: red; .foo-3 { width: 100%; } } }';
            const options = {
                depth: 3
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });

});
