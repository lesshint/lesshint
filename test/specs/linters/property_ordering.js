'use strict';

const { expect } = require('chai');
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#propertyOrdering()', function () {
        let options = {
            style: 'invalid'
        };


        it('should have the proper node types', function () {
            const source = '.foo {}';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should throw on invalid "style" value', function () {
            const source = '.foo { color: red; color: blue; }';

            return spec.parse(source, function (ast) {
                const lint = spec.linter.lint.bind(null, options, ast.root.first);

                expect(lint).to.throw(Error);
            });
        });

        describe('when using "alpha"', function () {
            beforeEach(function () {
                options = {
                    style: 'alpha',
                };
            });

            it('should allow blocks with only one property', function () {
                const source = '.foo { color: red; }';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow blocks with alphabetized properties', function () {
                const source = '.foo { color: red; padding-top: 4px; right: 5px}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow blocks with non-alphabetized properties', function () {
                const source = '.foo { padding-top: 4px; color: red; right: 5px}';
                const expected = [{
                    column: 26,
                    line: 1,
                    message: 'Property ordering is not alphabetized'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not report identical property names. See #59', function () {
                const source = '.foo { color: red; color: blue; }';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should check each rule on its own', function () {
                let source = '';

                source += '.form-group {';
                source += '    margin-bottom: 0;';
                source += '    .form-control {';
                source += '        height: auto;';
                source += '    }';
                source += '}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not try to check variables', function () {
                const source = '.foo { @b: auto; @a: inherit; }';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should check at-rules without rules (#460)', function () {
                const source = '@media (screen) { opacity: 1; color: red; }';
                const expected = [{
                    column: 31,
                    line: 1,
                    message: 'Property ordering is not alphabetized'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        });
    });
});
