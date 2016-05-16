'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAfterPropertyValue()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow a missing space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow any space when "style" is "no_space"', function () {
            var source = '.foo { color: red ; }';
            var expected = [{
                column: 18,
                line: 1,
                message: 'Semicolon after property value should not be preceded by any space.'
            }];

            var options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color: red ; }';
            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow a missing space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var expected = [{
                column: 18,
                line: 1,
                message: 'Semicolon after property value should be preceded by one space.'
            }];

            var options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });


        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: red ; }';
            var options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                var lint = spec.linter.lint.bind(null, options, ast.root.first.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
