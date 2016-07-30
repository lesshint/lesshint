'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#blankLineAfterBlock()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { color: red; }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not allow adjacent blocks without a blank line', function () {
            var source = '';
            var expected = [{
                message: 'All blocks should be followed by a blank line.'
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

        it('should allow adjacent blocks with a blank line', function () {
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

        it('should not allow adjacent blocks without a blank line', function () {
            var source = '';
            var expected = [{
                message: 'All blocks should be followed by a blank line.'
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

        it('should allow adjacent at-rule blocks with a blank line', function () {
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
    });
});
