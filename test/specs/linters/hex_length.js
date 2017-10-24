'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#hexLength()', function () {
        it('should have the proper node types', function () {
            const source = 'color: #ABC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow short hand hex values when "style" is "long"', function () {
            const source = 'color: #ABC;';
            const expected = [{
                column: 8,
                line: 1,
                message: '#ABC should be written in the long-form format.'
            }];

            const options = {
                style: 'long'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow longhand hex values when "style" is "long"', function () {
            const source = 'color: #AABBCC;';
            const options = {
                style: 'long'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow longhand hex values when "style" is "short"', function () {
            const source = 'color: #AABBCC;';
            const expected = [{
                column: 8,
                line: 1,
                message: '#AABBCC should be written in the short-form format.'
            }];

            const options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow short hand hex values when "style" is "short"', function () {
            const source = 'color: #ABC;';
            const options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow longhand hex values can can be written with a shorthand when "style" is "short"', function () {
            const source = 'color: #4B7A19;';
            const options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should find hex values in background declarations', function () {
            const source = 'background: url(test.png) no-repeat #AABBCC;';
            const expected = [{
                column: 37,
                line: 1,
                message: '#AABBCC should be written in the short-form format.'
            }];

            const options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow short hand hex values in variables when "style" is "long" (#28)', function () {
            const source = '@color: #ABC;';
            const expected = [{
                column: 9,
                line: 1,
                message: '#ABC should be written in the long-form format.'
            }];

            const options = {
                style: 'long'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow longhand hex values in variables when "style" is "short" (#28)', function () {
            const source = '@color: #AABBCC;';
            const expected = [{
                column: 9,
                line: 1,
                message: '#AABBCC should be written in the short-form format.'
            }];

            const options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore invalid colors', function () {
            const source = 'color: #abc1;';
            const options = {
                style: 'long'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            const source = 'color: #aabbcc;';
            const options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                const lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
