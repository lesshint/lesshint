'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#urlFormat()', function () {
        it('should have the proper node types', function () {
            const source = '.foo { background-image: url(img/image.jpg); }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should allow relative URLs when "style" is "relative"', function () {
            const source = '.foo { background-image: url(img/image.jpg); }';
            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow multiple relative URLs when "style" is "relative"', function () {
            const source = '.foo { background-image: url(img/image.jpg), url(img/foo.jpg); }';
            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow absolute URLs when "style" is "relative"', function () {
            const source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            const expected = [{
                column: 30,
                line: 1,
                message: 'URL "http://example.com/img/image.jpg" should be relative.'
            }];

            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow multiple absolute URLs when "style" is "relative"', function () {
            const source = '.foo { background-image: url(http://example.com/img/image.jpg), url(http://example.com/img/foo.jpg); }';
            const expected = [
                {
                    column: 30,
                    line: 1,
                    message: 'URL "http://example.com/img/image.jpg" should be relative.'
                },
                {
                    column: 69,
                    line: 1,
                    message: 'URL "http://example.com/img/foo.jpg" should be relative.'
                }
            ];

            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow absolute URLs when "style" is "absolute"', function () {
            const source = '.foo { background-image: url(http://example.com/img/image.jpg); }';
            const options = {
                style: 'absolute'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow relative URLs when "style" is "absolute"', function () {
            const source = '.foo { background-image: url(img/image.jpg); }';
            const expected = [{
                column: 30,
                line: 1,
                message: 'URL "img/image.jpg" should be absolute.'
            }];

            const options = {
                style: 'absolute'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should treat absolute URLs without a protocol as such when "style" is "relative"', function () {
            const source = '.foo { background-image: url(//example.com/img/image.jpg); }';
            const expected = [{
                column: 30,
                line: 1,
                message: 'URL "//example.com/img/image.jpg" should be relative.'
            }];

            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should treat absolute URLs without a protocol as such when "style" is "absolute"', function () {
            const source = '.foo { background-image: url(//example.com/img/image.jpg); }';
            const options = {
                style: 'absolute'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle relative URLs with single quotes', function () {
            const source = ".foo { background-image: url('img/image.jpg'); }";
            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle relative URLs with double quotes', function () {
            const source = '.foo { background-image: url("img/image.jpg"); }';
            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle absolute URLs with single quotes', function () {
            const source = ".foo { background-image: url('http://example.com/img/image.jpg'); }";
            const options = {
                style: 'absolute'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle absolute URLs with double quotes', function () {
            const source = '.foo { background-image: url("http://example.com/img/image.jpg"); }';
            const options = {
                style: 'absolute'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle quoted relative URLs surrounded by spaces (#22)', function () {
            const source = ".foo { background-image: url( 'img/image.jpg' ); }";
            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should handle unquoted URLs surrounded by spaces (#22)', function () {
            const source = '.foo { background-image: url( img/image.jpg ); }';
            const options = {
                style: 'relative'
            };

            return spec.parse(source, function (ast) {
                const result = spec.linter.lint(options, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            const source = '.foo { background-image: url(img/image.jpg); }';
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
