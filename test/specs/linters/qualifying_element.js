'use strict';

var assert = require('assert');
var path = require('path');
var linter = require('../../../lib/linters/' + path.basename(__filename));
var lint = require('../../lib/spec_linter')(linter);
var parseAST = require('../../../lib/linter').parseAST;
var undefined;

describe('lesshint', function () {
    describe('#qualifyingElement()', function () {
        it('should allow selectors without any qualifying element', function () {
            var source = '.foo {}';
            var ast;

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow ID selector with a qualifying element', function () {
            var source = 'div#foo {}';
            var actual;
            var ast;

            var expected = [{
                column: 4,
                line: 1,
                linter: 'qualifyingElement',
                message: 'Id selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow class selector with a qualifying element', function () {
            var source = 'div.foo {}';
            var actual;
            var ast;

            var expected = [{
                column: 4,
                line: 1,
                linter: 'qualifyingElement',
                message: 'Class selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should not allow attribute selector with a qualifying element', function () {
            var source = 'div[foo="bar"] {}';
            var actual;
            var ast;

            var expected = [{
                column: 4,
                line: 1,
                linter: 'qualifyingElement',
                message: 'Attribute selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should allow ID selector with a qualifying element when "allowWithId" is "true"', function () {
            var source = 'div#foo {}';
            var ast;

            var options = {
                qualifyingElement: {
                    enabled: true,
                    allowWithId: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow class selector with a qualifying element when "allowWithClass" is "true"', function () {
            var source = 'div.foo {}';
            var ast;

            var options = {
                qualifyingElement: {
                    enabled: true,
                    allowWithClass: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should allow attribute selector with a qualifying element when "allowWithAttribute" is "true"', function () {
            var source = 'div[foo="bar"] {}';
            var ast;

            var options = {
                qualifyingElement: {
                    enabled: true,
                    allowWithAttribute: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(undefined, lint(options, ast));
        });

        it('should not allow a class with a qualifying element in a descendant selector', function () {
            var source = '.foo div.bar {}';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                line: 1,
                linter: 'qualifyingElement',
                message: 'Class selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            actual = lint(options, ast);

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = 'div#foo {}';
            var ast;
            var options = {
                qualifyingElement: {
                    enabled: false
                }
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, lint(options, ast));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'div#foo {}';
            var ast;
            var options = {
                qualifyingElement: false
            };

            ast = parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, lint(options, ast));
        });
    });
});
