'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#borderZero()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { border: none; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow 0 as a value when "style" is "zero" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var options = {
                style: 'zero'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow 0 as a value when "style" is "none" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var expected = [{
                column: 16,
                line: 1,
                message: 'Border properties should use "none" instead of 0.'
            }];

            var options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });
        //
        it('should not allow "none" as a value when "style" is "zero" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var expected = [{
                column: 16,
                line: 1,
                message: 'Border properties should use 0 instead of "none".'
            }];

            var options = {
                style: 'zero'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-bottom"', function () {
            var source = '.foo { border-bottom: none; }';
            var options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-left"', function () {
            var source = '.foo { border-left: none; }';
            var options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-right"', function () {
            var source = '.foo { border-right: none; }';
            var options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-top"', function () {
            var source = '.foo { border-top: none; }';
            var options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not do anything when there is a actual border specified', function () {
            var source = '.foo { border: 1px solid #000000; }';
            var options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { border: 0; }';
            var options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                var node = ast.root.first.first;
                var lint = spec.linter.lint.bind(null, options, node);

                expect(lint).to.throw(Error);
            });
        });
    });
});
