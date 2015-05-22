var assert = require('assert');

describe('lesshint', function () {
    var linter = require('../../../lib/linter');
    var qualifyingElement = require('../../../lib/linters/qualifying_element');

    describe('#qualifyingElement()', function () {
        it('should allow selectors without any qualifying element', function () {
            var source = '.foo {}';
            var ast;

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(true, qualifyingElement({
                config: options,
                node: ast
            }));
        });

        it('should not allow ID selector with a qualifying element', function () {
            var source = 'div#foo {}';
            var actual;
            var ast;

            var expected = [{
                column: 4,
                file: 'test.less',
                line: 1,
                linter: 'qualifyingElement',
                message: 'ID selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            actual = qualifyingElement({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow class selector with a qualifying element', function () {
            var source = 'div.foo {}';
            var actual;
            var ast;

            var expected = [{
                column: 4,
                file: 'test.less',
                line: 1,
                linter: 'qualifyingElement',
                message: 'Class selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            actual = qualifyingElement({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow attribute selector with a qualifying element', function () {
            var source = 'div[foo="bar"] {}';
            var actual;
            var ast;

            var expected = [{
                column: 4,
                file: 'test.less',
                line: 1,
                linter: 'qualifyingElement',
                message: 'Attribute selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            actual = qualifyingElement({
                config: options,
                node: ast,
                path: 'test.less'
            });

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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(true, qualifyingElement({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(true, qualifyingElement({
                config: options,
                node: ast
            }));
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

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.strictEqual(true, qualifyingElement({
                config: options,
                node: ast
            }));
        });

        it('should not allow a class with a qualifying element in a descendant selector', function () {
            var source = '.foo div.bar {}';
            var actual;
            var ast;

            var expected = [{
                column: 9,
                file: 'test.less',
                line: 1,
                linter: 'qualifyingElement',
                message: 'Class selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            actual = qualifyingElement({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should not allow a class with a qualifying element in a selector group', function () {
            var source = '.foo, div.bar {}';
            var actual;
            var ast;

            var expected = [{
                column: 10,
                file: 'test.less',
                line: 1,
                linter: 'qualifyingElement',
                message: 'Class selectors should not include a qualifying element.'
            }];

            var options = {
                qualifyingElement: {
                    enabled: true
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            actual = qualifyingElement({
                config: options,
                node: ast,
                path: 'test.less'
            });

            assert.deepEqual(actual, expected);
        });

        it('should return null when disabled', function () {
            var source = 'div#foo';
            var ast;
            var options = {
                qualifyingElement: {
                    enabled: false
                }
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, qualifyingElement({
                config: options,
                node: ast
            }));
        });

        it('should return null when disabled via shorthand', function () {
            var source = 'div#foo';
            var ast;
            var options = {
                qualifyingElement: false
            };

            ast = linter.parseAST(source);
            ast = ast.first().first('selector');

            assert.equal(null, qualifyingElement({
                config: options,
                node: ast
            }));
        });
    });
});
