'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#trailingSemicolon()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow missing semicolons', function () {
            var source = '.foo { color: red }';
            var expected = [{
                column: 18,
                line: 1,
                message: 'All property declarations should end with a semicolon.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow semicolons', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore empty rules', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore empty rules with new lines', function () {
            var source = '.foo {\n}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow semicolons in rulesets inside @media declarations (#15)', function () {
            var source = '@media screen and (max-width: 768px) { @color: red; .div { color: @color; } }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report a missing semicolon when there is a space before the it', function () {
            var source = '.foo { color: red ; }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not try to check mixins without a body', function () {
            var source = '.foo { .mixin(); }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check imports', function () {
            var source = '@import \'lib/colors\';';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
