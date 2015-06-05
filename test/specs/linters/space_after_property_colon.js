var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceAfterPropertyColon = require('../../../lib/linters/space_after_property_colon');

    describe('#spaceAfterPropertyColon()', function () {
        it('should allow one space when "style" is "one_space"', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, spaceAfterPropertyColon({
                config: options,
                node: ast
            }));
        });

        it('should not tolerate missing space when "style" is "one_space"', function () {
            var source = '.foo { color:red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = spaceAfterPropertyColon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not tolerate more than one space when "style" is "one_space"', function () {
            var source = '.foo { color:  red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = spaceAfterPropertyColon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow any space when "style" is "no_space"', function () {
            var source = '.foo { color:red; }';
            var ast;

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.strictEqual(null, spaceAfterPropertyColon({
                config: options,
                node: ast
            }));
        });

        it('should not tolerate one space when "style" is "no_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should not be followed by any spaces.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = spaceAfterPropertyColon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not tolerate any space when "style" is "no_space"', function () {
            var source = '.foo { color:  red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should not be followed by any spaces.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            actual = spaceAfterPropertyColon({
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
                spaceAfterPropertyColon: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, spaceAfterPropertyColon({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyColon: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.equal(null, spaceAfterPropertyColon({
                config: options,
                node: ast
            }));
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color:red; }';
            var ast;
            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: "invalid"
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration');

            assert.throws(spaceAfterPropertyColon.bind(null, {
                config: options,
                node: ast
            }), Error);
        });
    });
});
