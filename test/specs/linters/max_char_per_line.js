'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#maxCharPerLine()', function () {
        it('should have the proper node types', function () {
            var source = '.foo { }';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.type);
            });
        });

        it('should allow files which do not have any lines exceed 10 characters', function () {
            var source = '.foo {}';
            var options = {
                limit: 10
            };

            return spec.parse(source, function (ast) {
            // Set to the limit to 10 characters to simplify test source
                var result = spec.linter.lint(options, ast.root);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow files which have any lines that exceed 10 characters', function () {
            var source = '.foofoofoofoo { }';
            var expected = [{
                column: 0,
                line: 1,
                message: 'Line should not exceed 10 characters, 17 found.'
            }];
            var options = {
                limit: 10
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should report multiple errors if there are multiple lines exceed characters limit', function () {
            var source = '.foofoofoofoo { }\n.looloolooloo { }';
            var expected = [
                {
                    column: 0,
                    line: 1,
                    message: 'Line should not exceed 10 characters, 17 found.'
                },
                {
                    column: 0,
                    line: 2,
                    message: 'Line should not exceed 10 characters, 17 found.'
                }
            ];
            var options = {
                limit: 10
            };

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint(options, ast.root);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should ignore empty files', function () {
            var source = '';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root);

                expect(result).to.be.undefined;
            });
        });
    });
});
