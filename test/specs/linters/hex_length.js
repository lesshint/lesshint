'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#hexLength()', function () {
        it('should have the proper node types', function () {
            var source = 'color: #ABC;';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow short hand hex values when "style" is "long"', function () {
            var source = 'color: #ABC;';
            var expected = [{
                column: 8,
                message: '#ABC should be written in the long-form format.'
            }];

            var options = {
                style: 'long'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow longhand hex values when "style" is "long"', function () {
            var source = 'color: #AABBCC;';
            var options = {
                style: 'long'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow longhand hex values when "style" is "short"', function () {
            var source = 'color: #AABBCC;';
            var expected = [{
                column: 8,
                message: '#AABBCC should be written in the short-form format.'
            }];

            var options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow short hand hex values when "style" is "short"', function () {
            var source = 'color: #ABC;';
            var options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow longhand hex values can can be written with a shorthand when "style" is "short"', function () {
            var source = 'color: #4B7A19;';
            var options = {
                style: 'short'
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
                message: '#AABBCC should be written in the short-form format.'
            }];

            var options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow short hand hex values in variables when "style" is "long" (#28)', function () {
            var source = '@color: #ABC;';
            var expected = [{
                column: 9,
                message: '#ABC should be written in the long-form format.'
            }];

            var options = {
                style: 'long'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow longhand hex values in variables when "style" is "short" (#28)', function () {
            var source = '@color: #AABBCC;';
            var expected = [{
                column: 9,
                message: '#AABBCC should be written in the short-form format.'
            }];

            var options = {
                style: 'short'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore invalid colors', function () {
            var source = 'color: #abc1;';
            var options = {
                style: 'long'
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
