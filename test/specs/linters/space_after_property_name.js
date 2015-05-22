var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceAfterPropertyName = require('../../../lib/linters/space_after_property_name');

    describe('#spaceAfterPropertyName()', function () {
        it('should allow a missing space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceAfterPropertyName: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, spaceAfterPropertyName({
                config: options,
                node: ast
            }));
        });

        it('should not allow any space when "style" is "no_space"', function () {
            var source = '.foo { color : red; }';
            var actual;
            var ast;

            var expected = {
                column: 13,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyName',
                message: 'Colon after property should not be preceded by any space.'
            };

            var options = {
                spaceAfterPropertyName: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = spaceAfterPropertyName({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color : red; }';
            var ast;

            var options = {
                spaceAfterPropertyName: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(true, spaceAfterPropertyName({
                config: options,
                node: ast
            }));
        });

        it('should not allow a missing space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 13,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyName',
                message: 'Colon after property should be preceded by one space.'
            };

            var options = {
                spaceAfterPropertyName: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = spaceAfterPropertyName({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyName: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, spaceAfterPropertyName({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyName: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, spaceAfterPropertyName({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyName: {
                    enabled: true,
                    style: "invalid"
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(spaceAfterPropertyName.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
