var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var spaceAfterPropertyColon = require('../../../lib/linters/space_after_property_colon');

    describe('#spaceAfterPropertyColon()', function () {
        it('should allow one space when style is "one_space"', function () {
            var source = '.foo { color: red; }';
            var ast;

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration')

            assert.equal(true, spaceAfterPropertyColon({
                config: options,
                node: ast
            }));
        });

        it('should not tolerate missing space when style is "one_space"', function () {
            var source = '.foo { color:red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property should be followed by one space.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration')

            actual = spaceAfterPropertyColon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not tolerate more than one space when style is "one_space"', function () {
            var source = '.foo { color:  red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property should be followed by one space.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration')

            actual = spaceAfterPropertyColon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('shouldn\'t allow any space when style is "no_space"', function () {
            var source = '.foo { color:red; }';
            var ast;

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration')

            assert.equal(true, spaceAfterPropertyColon({
                config: options,
                node: ast
            }));
        });

        it('should not tolerate one space when style is "no_space"', function () {
            var source = '.foo { color: red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property shouldn\'t be followed by any spaces.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration')

            actual = spaceAfterPropertyColon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not tolerate any space when style is "no_space"', function () {
            var source = '.foo { color:  red; }';
            var actual;
            var ast;

            var expected = {
                column: 14,
                file: 'test.less',
                line: 1,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property shouldn\'t be followed by any spaces.'
            };

            var options = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'no_space'
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('block').first('declaration')

            actual = spaceAfterPropertyColon({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });
    });
});
