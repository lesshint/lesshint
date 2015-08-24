var assert = require('assert');

describe('linter', function () {
    var linter = require('../../lib/linter');

    describe('lint', function () {
        it('should return array of errors', function () {
            var source = '.foo{ color:red; }\n';
            var path = 'test.less';
            var actual;

            var config = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                },
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            actual = linter.lint(source, path, config);

            assert.ok(actual.length === 2);
        });

        it('should handle all sorts of line endings (#40)', function () {
            var source = '.foo {\r\n margin-right:10px; }\r\n';
            var path = 'test.less';
            var actual;

            var expected = [{
                column: 15,
                file: 'test.less',
                line: 2,
                linter: 'spaceAfterPropertyColon',
                message: 'Colon after property name should be followed by one space.',
                source: ' margin-right:10px; }',
                type: 'WARNING'
            }];

            var config = {
                spaceAfterPropertyColon: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            actual = linter.lint(source, path, config);

            assert.deepEqual(actual, expected);
        });

        it('should pass the filename to the errors list', function () {
            var source = '.foo{ color: red; }\n';
            var path = 'path/to/file.less';
            var actual;

            var expected = [{
                column: 5,
                file: 'file.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                source: '.foo{ color: red; }',
                type: 'WARNING'
            }];

            var config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            actual = linter.lint(source, path, config);

            assert.deepEqual(actual, expected);
        });

        it('should expose the offending source in the errors list', function () {
            var source = '.foo{}';
            var path = 'path/to/file.less';
            var actual;

            var expected = [{
                column: 5,
                file: 'file.less',
                line: 1,
                linter: 'spaceBeforeBrace',
                message: 'Opening curly brace should be preceded by one space.',
                source: '.foo{}',
                type: 'WARNING'
            }];

            var config = {
                spaceBeforeBrace: {
                    enabled: true,
                    style: 'one_space'
                }
            };

            actual = linter.lint(source, path, config);

            assert.deepEqual(actual, expected);
        });
    });

    describe('parseAST', function () {
        it('should return an AST', function () {
            var source = '.foo { color: red; }';
            var ast = linter.parseAST(source);

            assert.ok(ast.toString); // If the returned object has the 'toString' method, we'll consider it a success
        });
    });
});
