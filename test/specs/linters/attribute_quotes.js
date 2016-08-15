'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#attributeQuotes()', function () {
        it('should have the proper node types', function () {
            var source = 'input[type="text"] {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should bail if the node has no selector', function () {
            var source = "input[type='text'] { width: 0; }";

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes', function () {
            var source = "input[type='text'] {}";

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow double quotes', function () {
            var source = 'input[type="text"] {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing quotes', function () {
            var source = 'input[type=text] {}';
            var expected = [{
                column: 12,
                line: 1,
                message: 'Attribute selectors should use quotes.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not check attribute selectors without an operator', function () {
            var source = 'input[required] {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check selectors without attributes', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check all selectors in a selector group', function () {
            var source = 'input[type=text], input[type=text] {}';
            var expected = [
                {
                    column: 12,
                    line: 1,
                    message: 'Attribute selectors should use quotes.'
                },
                {
                    column: 30,
                    line: 1,
                    message: 'Attribute selectors should use quotes.'
                }
            ];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
