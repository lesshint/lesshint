'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#propertyUnits()', function () {
        it('should allow allowed valid unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var result;
            var ast;

            var options = {
                properties: {},
                valid: ['rem']
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow valid property unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var result;
            var ast;

            var options = {
                properties: {
                    'font-size': ['rem']
                },
                valid: []
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow an unspecified unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Unit "rem" is not allowed for "font-size".'
            }];

            var options = {
                properties: {},
                valid: ['px']
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow an unspecified property unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Unit "rem" is not allowed for "font-size".'
            }];

            var options = {
                properties: {
                    'font-size': ['px']
                },
                valid: []
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow any units when no valid units are passed', function () {
            var source = '.foo { line-height: 24px; }';
            var result;
            var ast;

            var expected = [{
                column: 21,
                line: 1,
                message: 'Unit "px" is not allowed for "line-height".'
            }];

            var options = {
                properties: {},
                valid: []
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow any units when no property units are passed', function () {
            var source = '.foo { line-height: 24px; }';
            var result;
            var ast;

            var expected = [{
                column: 21,
                line: 1,
                message: 'Unit "px" is not allowed for "line-height".'
            }];

            var options = {
                properties: {
                    'line-height': []
                },
                valid: ['px']
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow percentages when set as a valid unit', function () {
            var source = '.foo { font-size: 100%; }';
            var result;
            var ast;

            var options = {
                properties: {},
                valid: ['%']
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow percentages when set as a valid property unit', function () {
            var source = '.foo { font-size: 100%; }';
            var result;
            var ast;

            var options = {
                properties: {
                    'font-size': ['%']
                },
                valid: []
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow percentages when set as an invalid unit', function () {
            var source = '.foo { font-size: 100%; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Percentages are not allowed for "font-size".'
            }];

            var options = {
                properties: {},
                valid: ['px']
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow percentages when set as an invalid property unit', function () {
            var source = '.foo { font-size: 100%; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Percentages are not allowed for "font-size".'
            }];

            var options = {
                properties: {
                    'font-size': ['px']
                },
                valid: []
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow an invalid unit', function () {
            var source = '.foo { font-size: 1px; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            var options = {
                invalid: ['px'],
                properties: {}
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow an invalid unit that overrides a valid unit', function () {
            var source = '.foo { font-size: 1px; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            var options = {
                invalid: ['px'],
                properties: {},
                valid: ['px']
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow an invalid unit that has been specified valid for a property', function () {
            var source = '.foo { font-size: 1px; }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            var options = {
                invalid: ['px'],
                properties: {
                    'font-size': ['px']
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should return null on variable declaration', function () {
            var source = '.foo { @var-name: 12px; }';
            var result;
            var ast;

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            result = linter.lint({}, ast);

            expect(result).to.equal(null);
        });
    });
});
