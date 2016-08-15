'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#emptyRule()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow rules with declarations', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow empty rules', function () {
            var source = '.foo {}';
            var expected = [{
                message: "There shouldn't be any empty rules present."
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow empty rules with a space', function () {
            var source = '.foo { }';
            var expected = [{
                message: "There shouldn't be any empty rules present."
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow rules with only mixins (#16)', function () {
            var source = '.foo { .mixin(); }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow rules with only atrules (#200)', function () {
            var source = '.foo { @atrule(); }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check mixin calls', function () {
            var source = '.mixin();';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check atrule calls (#200)', function () {
            var source = '@atrule();';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check mixin definitions', function () {
            var source = '.header-def(@rules) {h1,h2,h3,h4,h5,h6 {@rules();}}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
