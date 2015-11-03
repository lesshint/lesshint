var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#propertyUnits()', function () {
        it('should allow allowed valid unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var ast;

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: ['rem'],
                    properties: {}
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow valid property unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var ast;

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: [],
                    properties: {
                        'font-size': ['rem']
                    }
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow an unspecified unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'propertyUnits',
                message: 'Unit "rem" is not allowed for "font-size".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: ['px'],
                    properties: {}
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow an unspecified property unit', function () {
            var source = '.foo { font-size: 1rem; }';
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'propertyUnits',
                message: 'Unit "rem" is not allowed for "font-size".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: [],
                    properties: {
                        'font-size': ['px']
                    }
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow any units when no valid units are passed', function () {
            var source = '.foo { line-height: 24px; }';
            var ast;

            var expected = [{
                column: 21,
                line: 1,
                linter: 'propertyUnits',
                message: 'Unit "px" is not allowed for "line-height".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: [],
                    properties: {}
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow any units when no property units are passed', function () {
            var source = '.foo { line-height: 24px; }';
            var ast;

            var expected = [{
                column: 21,
                line: 1,
                linter: 'propertyUnits',
                message: 'Unit "px" is not allowed for "line-height".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: ['px'],
                    properties: {
                        'line-height': []
                    }
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow percentages when set as a valid unit', function () {
            var source = '.foo { font-size: 100%; }';
            var ast;

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: ['%'],
                    properties: {}
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow percentages when set as a valid property unit', function () {
            var source = '.foo { font-size: 100%; }';
            var ast;

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: [],
                    properties: {
                        'font-size': ['%']
                    }
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow percentages when set as an invalid unit', function () {
            var source = '.foo { font-size: 100%; }';
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'propertyUnits',
                message: 'Percentages are not allowed for "font-size".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: ['px'],
                    properties: {}
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow percentages when set as an invalid property unit', function () {
            var source = '.foo { font-size: 100%; }';
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'propertyUnits',
                message: 'Percentages are not allowed for "font-size".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: [],
                    properties: {
                        'font-size': ['px']
                    }
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow an invalid unit', function () {
            var source = '.foo { font-size: 1px; }';
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'propertyUnits',
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    invalid: ['px'],
                    properties: {}
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow an invalid unit that overrides a valid unit', function () {
            var source = '.foo { font-size: 1px; }';
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'propertyUnits',
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    valid: ['px'],
                    invalid: ['px'],
                    properties: {}
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow an invalid unit that has been specified valid for a property', function () {
            var source = '.foo { font-size: 1px; }';
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                linter: 'propertyUnits',
                message: 'Unit "px" is not allowed for "font-size".'
            }];

            var options = {
                propertyUnits: {
                    enabled: true,
                    invalid: ['px'],
                    properties: {
                        'font-size': ['px']
                    }
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { font-size: 16px; }';
            var ast;

            var options = {
                propertyUnits: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { font-size: 16px; }';
            var ast;

            var options = {
                propertyUnits: false
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when variable declaration', function () {
            var source = '.foo { @var-name: 12px; }';
            var ast;

            var options = {
                propertyUnits: {
                    enabled: true,
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, lint(options, ast));
        });
    });
});
