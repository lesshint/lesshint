'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#newlineAfterBlock()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow adjacent blocks without a new line', function () {
            var source = '';
            var expected = [{
                message: 'All blocks should be followed by a new line.'
            }];

            source += '.foo {';
            source += '    color: red;';
            source += '}';
            source += '.bar {';
            source += '    color: blue;';
            source += '}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.last);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow adjacent blocks with a new line', function () {
            var source = '';

            source += '.foo {';
            source += '    color: red;';
            source += '}';
            source += '\n\n';
            source += '.bar {';
            source += '    color: blue;';
            source += '}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.last);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow adjacent blocks without a new line', function () {
            var source = '';
            var expected = [{
                message: 'All blocks should be followed by a new line.'
            }];

            source += '.bar {';
            source += '    color: blue;';
            source += '}';
            source += '@media (screen) {';
            source += '}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.last);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow adjacent at-rule blocks with a new line', function () {
            var source = '';

            source += '.bar {';
            source += '    color: blue;';
            source += '}';
            source += '\n\n';
            source += '@media (screen) {';
            source += '}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.last);

                expect(result).to.be.undefined;
            });
        });

        it('should not check at-rules without a body', function () {
            var source = '@import "foo";';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.last);

                expect(result).to.be.undefined;
            });
        });

        it('should allow preceding comments without a new line', function () {
            var source = '';

            source += '.foo {';
            source += '    color: red;';
            source += '}';
            source += '\n\n';
            source += '// A comment';
            source += '\n';
            source += '.bar {';
            source += '    color: blue;';
            source += '}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.last);

                expect(result).to.be.undefined;
            });
        });

        it('should not report nested blocks with a preceding new line', function () {
            var source = '';

            source += '.foo {';
            source += '    color: red;';
            source += '\n\n';
            source += '    .bar {';
            source += '        color: red;';
            source += '    }';
            source += '}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.last);

                expect(result).to.be.undefined;
            });
        });
    });
});
