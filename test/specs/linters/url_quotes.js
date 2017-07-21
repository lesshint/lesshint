'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#urlQuotes()', function () {
        it('should have the proper node types', function () {
            const source = ".foo { background-image: url('img/image.jpg'); }";

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should have the proper node types', function () {
            const source = '@import url(http://example.com)';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not check nodes without params', function () {
            const source = '.foo { @bar }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check nodes without values', function () {
            const source = '.foo { @bar() }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes', function () {
            const source = '.foo { background-image: url(\'img/image.jpg\'); }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes with multiple urls', function () {
            const source = '.foo { background-image: url(\'img/image.jpg\'), url(\'img/foo.jpg\'); }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow double quotes', function () {
            const source = '.foo { background-image: url("img/image.jpg"); }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow double quotes with multiple urls', function () {
            const source = '.foo { background-image: url("img/image.jpg"), url("img/foo.jpg"); }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing quotes', function () {
            const source = '.foo { background-image: url(img/image.jpg); }';
            const expected = [{
                column: 30,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow missing quotes with multiple urls', function () {
            const source = '.foo { background-image: url(img/image.jpg), url(img/foo.jpg); }';
            const expected = [
                {
                    column: 30,
                    line: 1,
                    message: 'URLs should be enclosed in quotes.'
                },
                {
                    column: 50,
                    line: 1,
                    message: 'URLs should be enclosed in quotes.'
                }
            ];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow missing quotes in imports', function () {
            const source = '@import url(http://example.com)';
            const expected = [{
                column: 13,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow quoted urls in imports', function () {
            const source = "@import url('http://example.com')";

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow quoted URLs strings surrounded by spaces (#22)', function () {
            const source = ".foo { background-image: url( 'img/image.jpg' ); }";

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow unquoted URLs strings surrounded by spaces (#22)', function () {
            const source = '.foo { background-image: url( img/image.jpg ); }';
            const expected = [{
                column: 31,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore variables', function () {
            const source = '.foo { background-image: url(@bar) }';

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

    });
});
