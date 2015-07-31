var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var singleLinePerProperty = require('../../../lib/linters/single_line_per_property');

    describe('#singleLinePerProperty()', function () {
        it('should allow properties on separate lines', function () {
            var source = '.foo {\n color: red; \n margin-right: 10px; \n}';
            var ast;

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.strictEqual(null, singleLinePerProperty({
                config: options,
                node: ast
            }));
        });

        it('should not allow multiple properties on the same line', function () {
            var source = '.foo {\n color: red; margin-right: 10px; \n}';
            var actual;
            var ast;

            var expected = [{
                column: 2,
                line: 2,
                linter: 'singleLinePerProperty',
                message: "Each property should be on it's own line."
            },
            {
                column: 14,
                line: 2,
                linter: 'singleLinePerProperty',
                message: "Each property should be on it's own line."
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = singleLinePerProperty({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow opening brace on the same line as a property', function () {
            var source = '.foo { color: red; \n margin-right: 10px; \n}';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                linter: 'singleLinePerProperty',
                message: "Each property should be on it's own line."
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = singleLinePerProperty({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow closing brace on the same line as a property', function () {
            var source = '.foo {\n color: red; \n margin-right: 10px; }';
            var actual;
            var ast;

            var expected = [{
                column: 2,
                line: 3,
                linter: 'singleLinePerProperty',
                message: "Each property should be on it's own line."
            }];

            var options = {
                singleLinePerProperty: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('block');

            actual = singleLinePerProperty({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: red; margin-right: 10px; }';
            var ast;
            var options = {
                singleLinePerProperty: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, singleLinePerProperty({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: red; margin-right: 10px; }';
            var ast;
            var options = {
                singleLinePerProperty: false
            };

            ast = linter.parseAST(source);
            ast = ast.first('ruleset').first('block');

            assert.equal(null, singleLinePerProperty({
                config: options,
                node: ast
            }));
        });
    });
});
