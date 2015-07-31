var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var duplicateProperty = require('../../../lib/linters/duplicate_property');

    describe('#duplicateProperty()', function () {
        it('should allow single instances of each property', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, duplicateProperty({
                config: options,
                node: ast
            }));
        });

        it('should not allow duplicate properties', function () {
            var source = '.foo { color: red; color: blue; }';
            var actual;
            var ast;

            var expected = [{
                column: 20,
                line: 1,
                linter: 'duplicateProperty',
                message: 'Duplicate property: "color".'
            }];

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: []
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = duplicateProperty({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow excluded properties', function () {
            var source = '.foo { color: red; color: green; }';
            var ast;

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: ['color']
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, duplicateProperty({
                config: options,
                node: ast
            }));
        });

        it('should not allow duplicates of properties that are not excluded', function () {
            var source = '.foo { color: red; color: green; }';
            var actual;
            var ast;

            var expected = [{
                column: 20,
                line: 1,
                linter: 'duplicateProperty',
                message: 'Duplicate property: "color".'
            }];

            var options = {
                duplicateProperty: {
                    enabled: true,
                    exclude: ['background']
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = duplicateProperty({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: red; color: blue; }';
            var ast;
            var options = {
                duplicateProperty: {
                    enabled: false,
                    exclude: []
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, duplicateProperty({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: red; color: blue; }';
            var ast;
            var options = {
                duplicateProperty: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, duplicateProperty({
                config: options,
                node: ast
            }));
        });
    });
});
