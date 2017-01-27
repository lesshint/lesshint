'use strict';

const expect = require('chai').expect;
const spec = require('../util.js').setup();

describe('lesshint', function () {
    describe('#spaceAroundComma', function () {
        let options;

        it('should have the proper node types', function () {
            const source = 'color: rgb(255, 255, 255);';

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
                const source = 'color: rgb(255, 255, 255);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after comma', function () {
                const source = 'color: rgb(255,255,255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space after comma in mixins', function () {
                const source = '.mixin(@margin, @padding) {}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should account for multiline rules with commas', function () {
                const source = '.foo, \n.bar {}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should account for multiline rules with commas containing pseudo classes', function () {
                const source = '.test1,\n.test2:not(.test3),\n.test3:not(.test2) {\n    width: 100%;\n}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space after comma in mixins', function () {
                const source = '.mixin(@margin,@padding) {}';
                const expected = [{
                    column: 15,
                    message: 'Commas should be followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow multiline comma lists when allowNewline is false', function () {
                const source = 'font: 14px,\n    Roboto,\n    #000000;';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow multiline comma lists when allowNewline is true', function () {
                const source = 'font: 14px,\n    Roboto,\n    #000000;';

                options.allowNewline = true;

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

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
                const source = 'color: rgb(255 ,255 ,255);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma', function () {
                const source = 'color: rgb(255, 255, 255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space before comma in mixins', function () {
                const source = '.mixin(@margin ,@padding) {}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma in mixins', function () {
                const source = '.mixin(@margin, @padding) {}';
                const expected = [{
                    column: 15,
                    message: 'Commas should be preceded by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow multiline comma lists when allowNewline is true', function () {
                const source = 'font: 14px\n,    Roboto\n,    #000000;';

                options.allowNewline = true;

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

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
                const source = 'color: rgb(255 , 255 , 255);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma', function () {
                const source = 'color: rgb(255, 255, 255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after comma', function () {
                const source = 'color: rgb(255 ,255 ,255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space before and after comma', function () {
                const source = 'color: rgb(255,255,255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow one space before and after comma in mixins', function () {
                const source = '.mixin(@margin , @padding) {}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow missing space before comma in mixins', function () {
                const source = '.mixin(@margin, @padding) {}';
                const expected = [{
                    column: 15,
                    message: 'Commas should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow missing space after comma in mixins', function () {
                const source = '.mixin(@margin ,@padding) {}';
                const expected = [{
                    column: 16,
                    message: 'Commas should be preceded and followed by one space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

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
                const source = 'color: rgb(255,255,255);';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after comma', function () {
                const source = 'color: rgb(255, 255, 255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before comma', function () {
                const source = 'color: rgb(255 ,255 ,255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before and after comma', function () {
                const source = 'color: rgb(255 , 255 , 255);';
                const expected = [
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
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should allow a missing space after comma in mixins', function () {
                const source = '.mixin(@margin,@padding) {}';

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.be.undefined;
                });
            });

            it('should not allow one space after comma in mixins', function () {
                const source = '.mixin(@margin, @padding) {}';
                const expected = [{
                    column: 15,
                    message: 'Commas should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

                    expect(result).to.deep.equal(expected);
                });
            });

            it('should not allow one space before comma in mixins', function () {
                const source = '.mixin(@margin ,@padding) {}';
                const expected = [{
                    column: 16,
                    message: 'Commas should not be preceded nor followed by any space.'
                }];

                return spec.parse(source, function (ast) {
                    const result = spec.linter.lint(options, ast.root.first);

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
                const source = 'color: rgb(255 , 255 , 255);';

                return spec.parse(source, function (ast) {
                    const node = ast.root.first;
                    const lint = spec.linter.lint.bind(null, options, node);

                    expect(lint).to.throw(Error);
                });
            });
        }); // "invalid"
    });

    it('should ignore comma in the wrong place', function () {
        const source = 'color: rgb(255, 255, 255),';
        const options = {
            style: 'after'
        };

        return spec.parse(source, function (ast) {
            const result = spec.linter.lint(options, ast.root.first);
            expect(result).to.be.undefined;
        });
    });

});
