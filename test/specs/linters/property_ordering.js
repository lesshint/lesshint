'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#propertyOrdering()', function () {
        it('should have the proper node types', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow blocks with only one property', function () {
            var source = '.foo { color: red; }';
            var options = {
                style: 'alpha'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow blocks with alphabetized properties', function () {
            var source = '.foo { color: red; padding-top: 4px; right: 5px}';
            var options = {
                style: 'alpha'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow blocks with non-alphabetized properties', function () {
            var source = '.foo { padding-top: 4px; color: red; right: 5px}';
            var expected = [{
                column: 26,
                line: 1,
                message: 'Property ordering is not alphabetized'
            }];

            var options = {
                style: 'alpha'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not report identical property names. See #59', function () {
            var source = '.foo { color: red; color: blue; }';
            var options = {
                style: 'alpha'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should check each rule on its own', function () {
            var source = '';
            var options = {
                style: 'alpha'
            };

            source += '.form-group {';
            source += '    margin-bottom: 0;';
            source += '    .form-control {';
            source += '        height: auto;';
            source += '    }';
            source += '}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not try to check variables', function () {
            var source = '.foo { @b: auto; @a: inherit; }';
            var options = {
                style: 'alpha'
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: red; color: blue; }';
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
