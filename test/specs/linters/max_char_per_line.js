'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#maxCharPerLine()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.type);
            });
        });

        it('should allow files which do not have any lines exceed 10 characters', function () {
            const source = '.foo {}';
            const options = {
                limit: 10
            };

            return spec.parse(source, function (ast) {
            // Set to the limit to 10 characters to simplify test source
                const result = spec.linter.lint(options, ast.root);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow files which have any lines that exceed 10 characters', function () {
            const source = '.foofoofoofoo { }';
            const expected = [{
                column: 0,
                line: 1,
                message: 'Line should not exceed 10 characters, 17 found.'
            }];
            const options = {
                limit: 10
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should report multiple errors if there are multiple lines exceed characters limit', function () {
            const source = '.foofoofoofoo { }\n.looloolooloo { }';
            const expected = [
                {
                    column: 0,
                    line: 1,
                    message: 'Line should not exceed 10 characters, 17 found.'
                },
                {
                    column: 0,
                    line: 2,
                    message: 'Line should not exceed 10 characters, 17 found.'
                }
            ];
            const options = {
                limit: 10
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore empty files', function () {
            const source = '';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });
    });
});
