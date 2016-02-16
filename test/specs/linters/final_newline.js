'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#finalNewline()', function () {
        it('should allow files with final new lines', function () {
            var source = '.foo {}\n';
            var result;
            var ast;

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow files without final new lines', function () {
            var source = '.foo {}';
            var result;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                message: 'Files should end with a newline.'
            }];

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should ignore empty files', function () {
            var source = '';
            var result;
            var ast;

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.be.undefined;
        });

        it('should report the correct line number even for large files. #123', function () {
            var source = '';
            var result;
            var ast;

            var expected = [{
                column: 26,
                line: 17,
                message: 'Files should end with a newline.'
            }];

            source += '@import "something";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";\n';
            source += '@import "something-else";';

            ast = parseAST(source);

            result = linter.lint({}, ast);

            expect(result).to.deep.equal(expected);
        });
    });
});
