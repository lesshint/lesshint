'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();


describe('lesshint', function () {
    describe('#duplicateProperty()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow single instances of each property', function () {
            const source = '.foo { color: red; }';
            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow duplicate properties', function () {
            const source = '.foo { color: red; color: blue; }';
            const expected = [{
                column: 20,
                line: 1,
                message: 'Duplicate property: "color".'
            }];

            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow excluded properties', function () {
            const source = '.foo { color: red; color: green; }';
            const options = {
                exclude: ['color']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow duplicates of properties that are not excluded', function () {
            const source = '.foo { color: red; color: green; }';
            const expected = [{
                column: 20,
                line: 1,
                message: 'Duplicate property: "color".'
            }];

            const options = {
                exclude: ['background']
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore local variables', function () {
            const source = '.foo { @a: red; @b: 3px; }';
            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore nested properties', function () {
            const source = '.foo { color: red; .bar { color: blue; } }';
            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore comma merge properties', function () {
            const source = '.foo { box-shadow+: 0 0 10px #555; box-shadow+: inset 0 0 5px #222; }';
            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore space merge properties', function () {
            const source = '.foo { transform+_: scale(2); transform+_: rotate(15deg); }';
            const options = {
                exclude: []
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

    });
});
