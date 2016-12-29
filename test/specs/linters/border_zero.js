'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#borderZero()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { border: none; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border"', function () {
            const source = '.foo { border: none; }';
            const options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow 0 as a value when "style" is "zero" and the property is "border"', function () {
            const source = '.foo { border: 0; }';
            const options = {
                style: 'zero'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow 0 as a value when "style" is "none" and the property is "border"', function () {
            const source = '.foo { border: 0; }';
            const expected = [{
                column: 16,
                line: 1,
                message: 'Border properties should use "none" instead of 0.'
            }];

            const options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });
        //
        it('should not allow "none" as a value when "style" is "zero" and the property is "border"', function () {
            const source = '.foo { border: none; }';
            const expected = [{
                column: 16,
                line: 1,
                message: 'Border properties should use 0 instead of "none".'
            }];

            const options = {
                style: 'zero'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-bottom"', function () {
            const source = '.foo { border-bottom: none; }';
            const options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-left"', function () {
            const source = '.foo { border-left: none; }';
            const options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-right"', function () {
            const source = '.foo { border-right: none; }';
            const options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-top"', function () {
            const source = '.foo { border-top: none; }';
            const options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not do anything when there is a actual border specified', function () {
            const source = '.foo { border: 1px solid #000000; }';
            const options = {
                style: 'none'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            const source = '.foo { border: 0; }';
            const options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                const node = ast.root.first.first;
                const lint = spec.linter.lint.bind(null, options, node);

                expect(lint).to.throw(Error);
            });
        });
    });
});
