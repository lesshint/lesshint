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
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(true, duplicateProperty({
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
                file: 'test.less',
                line: 1,
                linter: 'duplicateProperty',
                message: 'Duplicate property: "color".'
            }];

            var options = {
                duplicateProperty: {
                    enabled: true
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

        it('should return null run when disabled', function () {
            var source = '.foo { color: red; color: blue; }';
            var ast;
            var options = {
                duplicateProperty: {
                    enabled: false
                }
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
