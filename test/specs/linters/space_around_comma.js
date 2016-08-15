'use strict';

var expect = require('chai').expect;
var spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAroundComma', function () {
        var options;

        it('should have the proper node types', function () {
            var source = 'color: rgb(255, 255, 255);';

            return spec.parse(source, function (ast) {
                expect(spec.linter.nodeTypes).to.include(ast.root.first.type);
            });
        });

        describe('when "style" is "after"', function () {
            beforeEach(function () {
                options = {
                    style: 'after'
                };
            });

            it('should allow one space after comma', function () {
                var source = 'color: rgb(255, 255, 255);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after comma', function () {
                var source = 'color: rgb(255,255,255);';
                var expected = [
                    {
                        column: 15,
                        message: 'Commas should be followed by one space.'
                    },
                    {
                        column: 19,
                        message: 'Commas should be followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space after comma in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should account for multiline rules with commas', function () {
                var source = '.foo, \n.bar {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should account for multiline rules with commas containing pseudo classes', function () {
                var source = '.test1,\n.test2:not(.test3),\n.test3:not(.test2) {\n    width: 100%;\n}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after comma in mixins', function () {
                var source = '.mixin(@margin,@padding) {}';
                var expected = [{
                    column: 15,
                    message: 'Commas should be followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiline comma lists when allowNewline is false', function () {
                var source = 'font: 14px,\n    Roboto,\n    #000000;';
                var expected = [
                    {
                        column: 11,
                        message: 'Commas should be followed by one space.'
                    },
                    {
                        column: 17,
                        message: 'Commas should be followed by one space.'
                    }
                ];

                options.allowNewline = false;

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow multiline comma lists when allowNewline is true', function () {
                var source = 'font: 14px,\n    Roboto,\n    #000000;';

                options.allowNewline = true;

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

        }); // "after"

        describe('when "style" is "before"', function () {
            beforeEach(function () {
                options = {
                    style: 'before'
                };
            });

            it('should allow one space before comma', function () {
                var source = 'color: rgb(255 ,255 ,255);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma', function () {
                var source = 'color: rgb(255, 255, 255);';
                var expected = [
                    {
                        column: 15,
                        message: 'Commas should be preceded by one space.'
                    },
                    {
                        column: 20,
                        message: 'Commas should be preceded by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space before comma in mixins', function () {
                var source = '.mixin(@margin ,@padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';
                var expected = [{
                    column: 15,
                    message: 'Commas should be preceded by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow multiline comma lists when allowNewline is true', function () {
                var source = 'font: 14px\n,    Roboto\n,    #000000;';

                options.allowNewline = true;

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });
        }); // "before"

        describe('when "style" is "both"', function () {
            beforeEach(function () {
                options = {
                    style: 'both'
                };
            });

            it('should allow one space before and after comma', function () {
                var source = 'color: rgb(255 , 255 , 255);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma', function () {
                var source = 'color: rgb(255, 255, 255);';
                var expected = [
                    {
                        column: 15,
                        message: 'Commas should be preceded and followed by one space.'
                    },
                    {
                        column: 20,
                        message: 'Commas should be preceded and followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after comma', function () {
                var source = 'color: rgb(255 ,255 ,255);';
                var expected = [
                    {
                        column: 16,
                        message: 'Commas should be preceded and followed by one space.'
                    },
                    {
                        column: 21,
                        message: 'Commas should be preceded and followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space before and after comma', function () {
                var source = 'color: rgb(255,255,255);';
                var expected = [
                    {
                        column: 15,
                        message: 'Commas should be preceded and followed by one space.'
                    },
                    {
                        column: 19,
                        message: 'Commas should be preceded and followed by one space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space before and after comma in mixins', function () {
                var source = '.mixin(@margin , @padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';
                var expected = [{
                    column: 15,
                    message: 'Commas should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after comma in mixins', function () {
                var source = '.mixin(@margin ,@padding) {}';
                var expected = [{
                    column: 16,
                    message: 'Commas should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "both"

        describe('when "style" is "none"', function () {
            beforeEach(function () {
                options = {
                    style: 'none'
                };
            });

            it('should allow a missing space after comma', function () {
                var source = 'color: rgb(255,255,255);';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after comma', function () {
                var source = 'color: rgb(255, 255, 255);';
                var expected = [
                    {
                        column: 15,
                        message: 'Commas should not be preceded nor followed by any space.'
                    },
                    {
                        column: 20,
                        message: 'Commas should not be preceded nor followed by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before comma', function () {
                var source = 'color: rgb(255 ,255 ,255);';
                var expected = [
                    {
                        column: 16,
                        message: 'Commas should not be preceded nor followed by any space.'
                    },
                    {
                        column: 21,
                        message: 'Commas should not be preceded nor followed by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before and after comma', function () {
                var source = 'color: rgb(255 , 255 , 255);';
                var expected = [
                    {
                        column: 16,
                        message: 'Commas should not be preceded nor followed by any space.'
                    },
                    {
                        column: 22,
                        message: 'Commas should not be preceded nor followed by any space.'
                    }
                ];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow a missing space after comma in mixins', function () {
                var source = '.mixin(@margin,@padding) {}';

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after comma in mixins', function () {
                var source = '.mixin(@margin, @padding) {}';
                var expected = [{
                    column: 15,
                    message: 'Commas should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before comma in mixins', function () {
                var source = '.mixin(@margin ,@padding) {}';
                var expected = [{
                    column: 16,
                    message: 'Commas should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    var result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });
        }); // "none"

        describe('with invalid "style" value', function () {
            beforeEach(function () {
                options = {
                    style: 'invalid'
                };
            });

            it('should throw an error', function () {
                var source = 'color: rgb(255 , 255 , 255);';

                return spec.parse(source, function (ast) {
                    var node = ast.root.first;
                    var lint = spec.linter.lint.bind(null, options, node);

                    expect(lint).to.throw(Error);
                });
            });
        }); // "invalid"
    });
});
