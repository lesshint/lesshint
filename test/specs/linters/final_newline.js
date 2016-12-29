'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#finalNewline()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.type);
            });
        });

        it('should allow files with final new lines', function () {
            const source = '.foo {}\n';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow files without final new lines', function () {
            const source = '.foo {}';
            const expected = [{
                column: 8,
                line: 1,
                message: 'Files should end with a newline.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

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

        it('should report the correct line number even for large files. #123', function () {
            let source = '@import "something";\n';
            let i;
            const expected = [{
                column: 26,
                line: 16,
                message: 'Files should end with a newline.'
            }];

            for (i = 0; i < 14; i++) {
                source += '@import "something-else";\n';
            }

            source += '@import "something-else";';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
