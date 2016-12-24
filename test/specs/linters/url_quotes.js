'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#urlQuotes()', function () {
        it('should have the proper node types', function () {
            var source = ".foo { background-image: url('img/image.jpg'); }";

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.first.type);
            });
        });

        it('should have the proper node types', function () {
            var source = '@import url(http://example.com)';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not check nodes without params', function () {
            var source = '.foo { @bar }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not check nodes without values', function () {
            var source = '.foo { @bar() }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes', function () {
            var source = '.foo { background-image: url(\'img/image.jpg\'); }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow single quotes with multiple urls', function () {
            var source = '.foo { background-image: url(\'img/image.jpg\'), url(\'img/foo.jpg\'); }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow double quotes', function () {
            var source = '.foo { background-image: url("img/image.jpg"); }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow double quotes with multiple urls', function () {
            var source = '.foo { background-image: url("img/image.jpg"), url("img/foo.jpg"); }';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing quotes', function () {
            var source = '.foo { background-image: url(img/image.jpg); }';
            var expected = [{
                column: 30,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow missing quotes with multiple urls', function () {
            var source = '.foo { background-image: url(img/image.jpg), url(img/foo.jpg); }';
            var expected = [
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
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow missing quotes in imports', function () {
            var source = '@import url(http://example.com)';
            var expected = [{
                column: 11,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow quoted urls in imports', function () {
            var source = "@import url('http://example.com')";

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow quoted URLs strings surrounded by spaces (#22)', function () {
            var source = ".foo { background-image: url( 'img/image.jpg' ); }";

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow unquoted URLs strings surrounded by spaces (#22)', function () {
            var source = '.foo { background-image: url( img/image.jpg ); }';
            var expected = [{
                column: 30,
                line: 1,
                message: 'URLs should be enclosed in quotes.'
            }];

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first.first);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should suggest adding quotes to a url', function () {
            var source = 'background-image: url(img/image.jpg);';
            var expectedFixes = [{
                mutations: [
                    {
                        insertion: '\'',
                        range: {
                            begin: 22
                        },
                        type: 'text-insert'
                    },
                    {
                        insertion: '\'',
                        range: {
                            begin: 36
                        },
                        type: 'text-insert'
                    }
                ],
                range: {
                    begin: 22,
                    end: 36
                },
                type: 'multiple'
            }];

            return spec.suggestFixes(source, {}, function (suggestedFixes) {
                expect(suggestedFixes).to.deep.equal(expectedFixes);
            });
        });
    });
});
