'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAfterPropertyColon()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow one space when "style" is "at_least_one_space"', function () {
            const source = '.foo { color: red; }';
            const options = {
                style: 'at_least_one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not tolerate missing space when "style" is "at_least_one_space"', function () {
            const source = '.foo { color:red; }';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Colon after property name should be followed by at least one space.'
            }];

            const options = {
                style: 'at_least_one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow more than one space when "style" is "at_least_one_space"', function () {
            const source = '.foo { color:  red; }';
            const options = {
                style: 'at_least_one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow one space when "style" is "one_space"', function () {
            const source = '.foo { color: red; }';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not tolerate missing space when "style" is "one_space"', function () {
            const source = '.foo { color:red; }';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Colon after property name should be followed by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not tolerate more than one space when "style" is "one_space"', function () {
            const source = '.foo { color:  red; }';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Colon after property name should be followed by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow any space when "style" is "no_space"', function () {
            const source = '.foo { color:red; }';
            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not tolerate one space when "style" is "no_space"', function () {
            const source = '.foo { color: red; }';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Colon after property name should not be followed by any spaces.'
            }];

            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not tolerate any space when "style" is "no_space"', function () {
            const source = '.foo { color:  red; }';
            const expected = [{
                column: 14,
                line: 1,
                message: 'Colon after property name should not be followed by any spaces.'
            }];

            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not care about spaces before the colon', function () {
            const source = '.foo { color : red; }';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            const source = '.foo { color:red; }';
            const options = {
                style: 'invalid'
            };

            return spec.parse(source, function (ast) {
                const lint = spec.linter.lint.bind(null, options, ast.root.first.first);

                expect(lint).to.throw(Error);
            });
        });
    });
});
