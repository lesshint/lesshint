var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceAfterPropertyValue = require('../../../lib/linters/space_after_property_value');

    describe('#spaceAfterPropertyValue()', function () {
        it('should allow a missing space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, spaceAfterPropertyValue({
                config: options,
                node: ast
            }));
        });

        it('should not allow any space when "style" is "no_space"', function () {
            var source = '.foo { color: red ; }';
            var actual;
            var ast;

            var expected = [{
                column: 18,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should not be preceded by any space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = spaceAfterPropertyValue({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color: red ; }';
            var ast;

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.strictEqual(null, spaceAfterPropertyValue({
                config: options,
                node: ast
            }));
        });

        it('should not allow a missing space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should be preceded by one space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = spaceAfterPropertyValue({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow any space on multiple property values when "style" is "no_space"', function () {
            var source = '.foo { color: red ; margin-right: 10px ; }';
            var actual;
            var ast;

            var expected = [{
                column: 18,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should not be preceded by any space.',
            },
            {
                column: 39,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should not be preceded by any space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = spaceAfterPropertyValue({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow a missing space on multiple property values when "style" is "one_space"', function () {
            var source = '.foo { color: red; margin-right: 10px; }';
            var actual;
            var ast;

            var expected = [{
                column: 8,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should be preceded by one space.'
            },
            {
                column: 20,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyValue',
                message: 'Semicolon after property value should be preceded by one space.'
            }];

            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            actual = spaceAfterPropertyValue({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color: red ; }';
            var ast;
            var options = {
                spaceAfterPropertyValue: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, spaceAfterPropertyValue({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color: red ; }';
            var ast;
            var options = {
                spaceAfterPropertyValue: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.equal(null, spaceAfterPropertyValue({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: red ; }';
            var ast;
            var options = {
                spaceAfterPropertyValue: {
                    enabled: true,
                    style: "invalid"
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block');

            assert.throws(spaceAfterPropertyValue.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
