'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();


describe('lesshint', function () {
    describe('#duplicateProperty()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow single instances of each property', function () {
            var source = '.foo { color: red; }';
            var options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow duplicate properties', function () {
            var source = '.foo { color: red; color: blue; }';
            var expected = [{
                column: 20,
                line: 1,
                message: 'Duplicate property: "color".'
            }];

            var options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow excluded properties', function () {
            var source = '.foo { color: red; color: green; }';
            var options = {
                exclude: ['color']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow duplicates of properties that are not excluded', function () {
            var source = '.foo { color: red; color: green; }';
            var expected = [{
                column: 20,
                line: 1,
                message: 'Duplicate property: "color".'
            }];

            var options = {
                exclude: ['background']
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore local variables', function () {
            var source = '.foo { @a: red; @b: 3px; }';
            var options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore nested properties', function () {
            var source = '.foo { color: red; .bar { color: blue; } }';
            var options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
