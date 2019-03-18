'use strict';

const { expect } = require('chai');
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#newlineAfterBlock()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow adjacent blocks without a blank line', function () {
            const source = `
                .foo { color: red; }
                .bar { color: blue; }
            `;

            const expected = [{
                message: 'All blocks should be followed by a new line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow adjacent blocks on the same line', function () {
            const source = `
                .foo { color: red; }
                .bar { color: blue; }
            `;
            const expected = [{
                message: 'All blocks should be followed by a new line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow adjacent blocks with a new line', function () {
            const source = `
                .foo { color: red; }

                .bar { color: blue; }
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow adjacent blocks without a new line', function () {
            const source = `
                .bar { color: blue; }
                @media (screen) {}
            `;

            const expected = [{
                message: 'All blocks should be followed by a new line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow adjacent at-rule blocks with a new line', function () {
            const source = `
                .bar { color: blue; }

                @media (screen) {}
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check at-rules without a body', function () {
            const source = `
                @import "foo";
                .foo {
                    color: red;
                }
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report nested blocks with a preceding new line', function () {
            let source = '';

            source += '.foo {';
            source += '    color: red;';
            source += '\n\n';
            source += '    .bar {';
            source += '        color: red;';
            source += '    }';
            source += '\n';
            source += '}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.last);

                expect(result).to.be.undefined;
            });
        });

        it('should not report nested blocks with a preceding new line containing other white space', function () {
            let source = '';

            source += '.foo {';
            source += '    color: red;';
            source += '\n \t\n';
            source += '    .bar {';
            source += '        color: red;';
            source += '    }';
            source += '\n';
            source += '}';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.last);

                expect(result).to.be.undefined;
            });
        });

        it('should report mixin calls after other blocks (#510)', function () {
            const source = `
            .foo {
                @media (min-width: 100px) {
                    color: red;
                }
                .bar(@baz);
            }
            `;

            const expected = [{
                message: 'All blocks should be followed by a new line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });


        it('should not check adjacent mixin calls (#513)', function () {
            const source = `
            .foo {
                .bar();
                .baz();
                color: red;
            }
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report mixin calls after properties (#520)', function () {
            const source = `
            .foo {
                color: red;
                .baz();
            }
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should ignore comments after a node', function () {
            const source = `
            .foo {
                color: red;
                .baz(); // comment
            }
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not report blocks following a comment and a newline', function () {
            const source = `
            .foo {
                color: red;
            }
            // comment
            // another comment

            .bar {
                color: blue;
            }
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should report blocks following a comment without a newline', function () {
            const source = `
            .foo {
                color: red;
            }
            // comment
            .bar {
                color: blue;
            }
            `;

            const expected = [{
                message: 'All blocks should be followed by a new line.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore variable declarations', function () {
            const source = `
            @var: red;
            .foo {
                color: @var;
            }
            `;

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });
    });
});
