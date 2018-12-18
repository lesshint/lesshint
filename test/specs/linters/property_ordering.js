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
                    message: '"color" should be before "padding-top"'
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
                    message: '"color" should be before "opacity"'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        });

        describe('when using "concentric"', function () {
            beforeEach(function () {
                options = {
                    style: 'concentric',
                };
            });

            it('should allow blocks with only one property', function () {
                const source = '.foo { color: red; }';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow blocks with concentric properties', function () {
                const source = '.foo {right: 5px; padding-top: 4px; color: red;}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow blocks with non-concentric properties', function () {
                const source = '.foo {padding-top: 4px; color: red; right: 5px}';
                const expected = [{
                    column: 37,
                    line: 1,
                    message: '"right" should be before "color"',
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
                const source = '@media (screen) { color: red; opacity: 1; }';
                const expected = [{
                    column: 31,
                    line: 1,
                    message: '"opacity" should be before "color"',
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should report "unknown" properties not in alphabatical order', function () {
                const source = '.foo {display: block; foo: 1; bar: 10;}';
                const expected = [{
                    column: 31,
                    line: 1,
                    message: '"bar" should be before "foo"',
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should report "unknown" properties at the end', function () {
                const source = '.foo {foo: bar; display: block;}';
                const expected = [{
                    column: 17,
                    line: 1,
                    message: '"display" should be before "foo"',
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not report error when an unknown property is alphabatically before knowned ones', function () {
                const source = '.btn {border: 0; appearance: none;}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });
        });
    });
});
