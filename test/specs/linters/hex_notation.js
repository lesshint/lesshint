'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#hexNotation()', function () {
        it('should have the proper node types', function () {
            const source = 'color: #AABBCC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow uppercase hex values when "style" is "lowercase"', function () {
            const source = 'color: #AABBCC;';
            const expected = [{
                column: 8,
                line: 1,
                message: '#AABBCC should be written in lowercase.'
            }];

            const options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow lowercase hex values when "style" is "lowercase"', function () {
            const source = 'color: #aabbcc;';
            const options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow lowercase hex values when "style" is "uppercase"', function () {
            const source = 'color: #aabbcc;';
            const expected = [{
                column: 8,
                line: 1,
                message: '#aabbcc should be written in uppercase.'
            }];

            const options = {
                style: 'uppercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow uppercase hex values when "style" is "uppercase"', function () {
            const source = 'color: #AABBCC;';
            const options = {
                style: 'uppercase'
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
                message: '#AABBCC should be written in lowercase.'
            }];

            const options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow uppercase hex values in variables when "style" is "lowercase" (#28)', function () {
            const source = '@color: #AABBCC;';
            const expected = [{
                column: 9,
                line: 1,
                message: '#AABBCC should be written in lowercase.'
            }];

            const options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow lowercase hex values in variables when "style" is "uppercase" (#28)', function () {
            const source = '@color: #aabbcc;';
            const expected = [{
                column: 9,
                line: 1,
                message: '#aabbcc should be written in uppercase.'
            }];

            const options = {
                style: 'uppercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore colors with only numbers', function () {
            const source = 'color: #123456;';
            const options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore colors with invalid length', function () {
            const source = 'color: #abc1;';
            const options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore colors with invalid characters', function () {
            const source = 'color: #abck;';
            const options = {
                style: 'lowercase'
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
