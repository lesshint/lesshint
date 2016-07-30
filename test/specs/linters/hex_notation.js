'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#hexNotation()', function () {
        it('should have the proper node types', function () {
            var source = 'color: #AABBCC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow uppercase hex values when "style" is "lowercase"', function () {
            var source = 'color: #AABBCC;';
            var expected = [{
                column: 8,
                message: '#AABBCC should be written in lowercase.'
            }];

            var options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow lowercase hex values when "style" is "lowercase"', function () {
            var source = 'color: #aabbcc;';
            var options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow lowercase hex values when "style" is "uppercase"', function () {
            var source = 'color: #aabbcc;';
            var expected = [{
                column: 8,
                message: '#aabbcc should be written in uppercase.'
            }];

            var options = {
                style: 'uppercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow uppercase hex values when "style" is "uppercase"', function () {
            var source = 'color: #AABBCC;';
            var options = {
                style: 'uppercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should find hex values in background declarations', function () {
            var source = 'background: url(test.png) no-repeat #AABBCC;';
            var expected = [{
                column: 37,
                message: '#AABBCC should be written in lowercase.'
            }];

            var options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow uppercase hex values in variables when "style" is "lowercase" (#28)', function () {
            var source = '@color: #AABBCC;';
            var expected = [{
                column: 9,
                message: '#AABBCC should be written in lowercase.'
            }];

            var options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow lowercase hex values in variables when "style" is "uppercase" (#28)', function () {
            var source = '@color: #aabbcc;';
            var expected = [{
                column: 9,
                message: '#aabbcc should be written in uppercase.'
            }];

            var options = {
                style: 'uppercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore colors with only numbers', function () {
            var source = 'color: #123456;';
            var options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore colors with invalid length', function () {
            var source = 'color: #abc1;';
            var options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore colors with invalid characters', function () {
            var source = 'color: #abck;';
            var options = {
                style: 'lowercase'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            var source = 'color: #aabbcc;';
            var options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                var lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
