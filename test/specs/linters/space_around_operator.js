'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAroundOperator', function () {
        var options;

        it('should have the proper node types', function () {
            var source = 'height: calc(10px + 10px);';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        describe('when "style" is "both"', function () {
            beforeEach(function () {
                options = {
                    style: 'both'
                };
            });

            it('should allow one space before and after operator', function () {
                var source = 'height: calc(10px + 10px);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before operator', function () {
                var source = 'height: calc(10px+ 10px);';
                var expected = [{
                    column: 20,
                    message: 'Operators should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after operator', function () {
                var source = 'height: calc(10px +10px);';
                var expected = [{
                    column: 22,
                    message: 'Operators should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space before and after operator', function () {
                var source = 'height: calc(10px+10px);';
                var expected = [{
                    column: 20,
                    message: 'Operators should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not report on negative values', function () {
                var source = 'margin-left: -10px;';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative values in shorthands', function () {
                var source = 'margin: -10px -1px 0px 20px;';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative number at the end of the value', function () {
                var source = '@foo: (@bar / 3) * -1;';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative number at the end of brackets', function () {
                var source = '@b: spin(@a, -2%);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on negative variables. See #179', function () {
                var source = 'margin-left: -@foo;';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on font-size/line-height shorthand declaration', function () {
                var source = 'font: 12px/1.5 Arial;';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not report on browser-prefixed functions', function () {
                var source = 'background: -webkit-linear-gradient(0);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });
        }); // "both"

        describe('when "style" is "none"', function () {
            beforeEach(function () {
                options = {
                    style: 'none'
                };
            });

            it('should allow missing space before and after operator', function () {
                var source = 'height: calc(10px+10px);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space before operator', function () {
                var source = 'height: calc(10px +10px);';
                var expected = [{
                    column: 21,
                    message: 'Operators should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space after operator', function () {
                var source = 'height: calc(10px+ 10px);';
                var expected = [{
                    column: 22,
                    message: 'Operators should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow a space after operator in shorthand values', function () {
                var source = 'margin: 10px - 1px 0px 20px;';
                var expected = [{
                    column: 16,
                    message: 'Operators should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "none"

        describe('with invalid "style" value', function () {
            beforeEach(function () {
                options = {
                    style: 'invalid'
                };
            });

            it('should throw an error', function () {
                var source = 'height: calc(10px+10px);';

                return spec.parse(source, function (ast) {
                    var node = ast.root.first;
                    var lint = spec.linter.lint.bind(null, options, node);

                    expect(lint).to.throw(Error);
                });
            });
        }); // "invalid"
    });
});
