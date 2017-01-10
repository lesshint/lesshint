'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#comment()', function () {
        it('should have the proper node types', function () {
            const source = '/* Hello world */';

            // returning a promise allows mocha to handle the promise natively
            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should allow single-line comments', function () {
            const source = '// Hello world';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow multi-line comments', function () {
            const source = '/* Hello world */';
            const expected = [{
                message: 'There shouldn\'t be any multi-line comments.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow comments matching "allowed" option regexp', function () {
            const source = '/*! Hello world */';
            const options = {
                allowed: '^!'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
