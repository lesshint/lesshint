'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceBetweenParens()', function () {
        var options;

        it('should have the proper node types', function () {
            var source = 'color: rgb(255, 255, 255);';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        it('should not check other rules than mixins', function () {
            var source = '.foo {}';

            return spec.parse(source, function (ast) {
                var result = spec.linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        describe('when "style" is "no_space"', function () {
            beforeEach(function () {
                options = {
                    style: 'no_space'
                };
            });

            it('should allow missing space after opening parenthesis', function () {
                var source = 'color: rgb(255, 255, 255);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow missing space before closing parenthesis', function () {
                var source = 'color: rgb(255, 255, 255);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow missing space after opening parenthesis and before closing parenthesis', function () {
                var source = 'color: rgb(255, 255, 255);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after opening parenthesis', function () {
                var source = 'color: rgb( 255, 255, 255);';
                var expected = [{
                    column: 12,
                    line: 1,
                    message: 'Opening parenthesis should not be followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before closing parenthesis', function () {
                var source = 'color: rgb(255, 255, 255 );';
                var expected = [{
                    column: 25,
                    line: 1,
                    message: 'Closing parenthesis should not be preceded by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space after opening parenthesis and before closing parenthesis', function () {
                var source = 'color: rgb( 255, 255, 255 );';
                var expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Opening parenthesis should not be followed by any space.'
                    },
                    {
                        column: 26,
                        line: 1,
                        message: 'Closing parenthesis should not be preceded by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis', function () {
                var source = 'color: rgb(  255, 255, 255);';
                var expected = [{
                    column: 12,
                    line: 1,
                    message: 'Opening parenthesis should not be followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces before closing parenthesis', function () {
                var source = 'color: rgb(255, 255, 255  );';
                var expected = [{
                    column: 25,
                    line: 1,
                    message: 'Closing parenthesis should not be preceded by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis and before closing parenthesis', function () {
                var source = 'color: rgb(  255, 255, 255  );';
                var expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Opening parenthesis should not be followed by any space.'
                    },
                    {
                        column: 27,
                        line: 1,
                        message: 'Closing parenthesis should not be preceded by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow missing space after opening parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow missing space before closing parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow missing space after opening parenthesis and before closing parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow multiline mixins', function () {
                var source = '.mixin(\n@a,\n@b\n) {\n \n}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after opening parenthesis in mixins', function () {
                var source = '.mixin( @margin, @padding) {}';
                var expected = [{
                    column: 8,
                    line: 1,
                    message: 'Opening parenthesis should not be followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before closing parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding ) {}';
                var expected = [{
                    column: 25,
                    line: 1,
                    message: 'Closing parenthesis should not be preceded by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space after opening parenthesis and before closing parenthesis in mixins', function () {
                var source = '.mixin( @margin, @padding ) {}';
                var expected = [
                    {
                        column: 8,
                        line: 1,
                        message: 'Opening parenthesis should not be followed by any space.'
                    },
                    {
                        column: 26,
                        line: 1,
                        message: 'Closing parenthesis should not be preceded by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis in mixins', function () {
                var source = '.mixin(  @margin, @padding) {}';
                var expected = [{
                    column: 8,
                    line: 1,
                    message: 'Opening parenthesis should not be followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces before closing parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding  ) {}';
                var expected = [{
                    column: 25,
                    line: 1,
                    message: 'Closing parenthesis should not be preceded by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis and before closing parenthesis in mixins', function () {
                var source = '.mixin(  @margin, @padding  ) {}';
                var expected = [
                    {
                        column: 8,
                        line: 1,
                        message: 'Opening parenthesis should not be followed by any space.'
                    },
                    {
                        column: 27,
                        line: 1,
                        message: 'Closing parenthesis should not be preceded by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow missing space before closing parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });
        }); // "no_space"

        describe('when "style" is "one_space"', function () {
            beforeEach(function () {
                options = {
                    style: 'one_space'
                };
            });

            it('should allow one space after opening parenthesis', function () {
                var source = 'color: rgb( 255, 255, 255 );';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow one space before closing parenthesis', function () {
                var source = 'color: rgb( 255, 255, 255 );';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow one space after opening parenthesis and before closing parenthesis', function () {
                var source = 'color: rgb( 255, 255, 255 );';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after opening parenthesis', function () {
                var source = 'color: rgb(255, 255, 255 );';
                var expected = [{
                    column: 12,
                    line: 1,
                    message: 'Opening parenthesis should be followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space before closing parenthesis', function () {
                var source = 'color: rgb( 255, 255, 255);';
                var expected = [{
                    column: 26,
                    line: 1,
                    message: 'Closing parenthesis should be preceded by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after opening parenthesis and before closing parenthesis', function () {
                var source = 'color: rgb(255, 255, 255);';
                var expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Opening parenthesis should be followed by one space.'
                    },
                    {
                        column: 25,
                        line: 1,
                        message: 'Closing parenthesis should be preceded by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis', function () {
                var source = 'color: rgb(  255, 255, 255 );';
                var expected = [{
                    column: 12,
                    line: 1,
                    message: 'Opening parenthesis should be followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces before closing parenthesis', function () {
                var source = 'color: rgb( 255, 255, 255  );';
                var expected = [{
                    column: 26,
                    line: 1,
                    message: 'Closing parenthesis should be preceded by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis and before closing parenthesis', function () {
                var source = 'color: rgb(  255, 255, 255  );';
                var expected = [
                    {
                        column: 12,
                        line: 1,
                        message: 'Opening parenthesis should be followed by one space.'
                    },
                    {
                        column: 27,
                        line: 1,
                        message: 'Closing parenthesis should be preceded by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space after opening parenthesis in mixins', function () {
                var source = '.mixin( @margin, @padding ) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow one space before closing parenthesis in mixins', function () {
                var source = '.mixin( @margin, @padding ) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow one space after opening parenthesis and before closing parenthesis in mixins', function () {
                var source = '.mixin( @margin, @padding ) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should allow one space before closing paren in multiline mixins', function () {
                var source = '.mixin( \n@a,\n@b\n ) {\n \n}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after opening parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding ) {}';
                var expected = [{
                    column: 8,
                    line: 1,
                    message: 'Opening parenthesis should be followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space before closing parenthesis in mixins', function () {
                var source = '.mixin( @margin, @padding) {}';
                var expected = [{
                    column: 26,
                    line: 1,
                    message: 'Closing parenthesis should be preceded by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after opening parenthesis and before closing parenthesis in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';
                var expected = [
                    {
                        column: 8,
                        line: 1,
                        message: 'Opening parenthesis should be followed by one space.'
                    },
                    {
                        column: 25,
                        line: 1,
                        message: 'Closing parenthesis should be preceded by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis in mixins', function () {
                var source = '.mixin(  @margin, @padding ) {}';
                var expected = [{
                    column: 8,
                    line: 1,
                    message: 'Opening parenthesis should be followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces before closing parenthesis in mixins', function () {
                var source = '.mixin( @margin, @padding  ) {}';
                var expected = [{
                    column: 26,
                    line: 1,
                    message: 'Closing parenthesis should be preceded by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiple spaces after opening parenthesis and before closing parenthesis in mixins', function () {
                var source = '.mixin(  @margin, @padding  ) {}';
                var expected = [
                    {
                        column: 8,
                        line: 1,
                        message: 'Opening parenthesis should be followed by one space.'
                    },
                    {
                        column: 27,
                        line: 1,
                        message: 'Closing parenthesis should be preceded by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "one_space"

        describe('with invalid "style" value', function () {
            beforeEach(function () {
                options = {
                    style: 'invalid'
                };
            });

            it('should throw an error', function () {
                var source = 'color: rgb( 255, 255, 255 );';

                return spec.parse(source, function (ast) {
                    var node = ast.root.first;
                    var lint = spec.linter.lint.bind(null, options, node);

                    expect(lint).to.throw(Error);
                });
            });
        });
    });
});
