'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAfterPropertyName()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow a missing space when "style" is "no_space"', function () {
            const source = '.foo { color: red; }';
            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });

        });

        it('should not allow any space when "style" is "no_space"', function () {
            const source = '.foo { color : red; }';
            const expected = [{
                column: 13,
                line: 1,
                message: 'Colon after property should not be preceded by any space.'
            }];

            const options = {
                style: 'no_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow one space when "style" is "one_space"', function () {
            const source = '.foo { color : red; }';
            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow a missing space when "style" is "one_space"', function () {
            const source = '.foo { color: red; }';
            const expected = [{
                column: 13,
                line: 1,
                message: 'Colon after property should be preceded by one space.'
            }];

            const options = {
                style: 'one_space'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
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
