'use strict';

const { expect } = require('chai');
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#importRestrict()', function () {
        it('should have the proper node types', function () {
            const source = '@import "foo";';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow import path when no prefix provided', function () {
            const source = '@import "foo";';
            const options = {
                restrictPrefix: [],
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow import path when prefix is different from the one provided', function () {
            const source = '@import "foo/bar";';
            const options = {
                restrictPrefix: ['bar'],
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow import path with prefix', function () {
            const source = '@import "foo";';
            const options = {
                restrictPrefix: ['foo'],
            };
            const expected = [{
                column: 10,
                line: 1,
                message: 'Imported file with path prefix "foo" is restricted.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow import path when path includes a different string from the one provided', function () {
            const source = '@import "bar";';
            const options = {
                restrictPattern: ['foo'],
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow import path when path includes a string provided as restricted pattern', function () {
            const source = '@import "some/random/bar/styles.less";';
            const options = {
                restrictPattern: ['random/bar'],
            };
            const expected = [{
                column: 10,
                line: 1,
                message: 'Imported file contains "random/bar" which is a restricted @import path pattern.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore other at-rules', function () {
            const source = '@charset "utf-8";';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
