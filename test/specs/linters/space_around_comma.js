'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#spaceAroundComma', function () {
        it('should allow one space after comma when "style" is "after"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var result;
            var ast;

            var options = {
                style: 'after'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space after comma when "style" is "after"', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var result;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                message: 'Commas should be followed by one space.'
            },
            {
                column: 27,
                line: 1,
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                style: 'after'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow one space after comma in mixins when "style" is "after"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var result;
            var ast;

            var options = {
                style: 'after'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space after comma in mixins when "style" is "after"', function () {
            var source = '.mixin(@margin,@padding) {}';
            var result;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                message: 'Commas should be followed by one space.'
            }];

            var options = {
                style: 'after'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report on operators other than commas when "style" is "after". See #49', function () {
            var source = '@var: (4 /2);';
            var result;
            var ast;

            var options = {
                style: 'after'
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow one space before comma when "style" is "before"', function () {
            var source = '.foo { color: rgb(255 ,255 ,255); }';
            var result;
            var ast;

            var options = {
                style: 'before'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space before comma when "style" is "before"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Commas should be preceded by one space.'
            },
            {
                column: 24,
                line: 1,
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                style: 'before'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow one space before comma in mixins when "style" is "before"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var result;
            var ast;

            var options = {
                style: 'before'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space before comma in mixins when "style" is "before"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var result;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                message: 'Commas should be preceded by one space.'
            }];

            var options = {
                style: 'before'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report on operators other than commas when "style" is "before". See #49', function () {
            var source = '@var: (4/ 2);';
            var result;
            var ast;

            var options = {
                style: 'before'
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow one space before and after comma when "style" is "both"', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var result;
            var ast;

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space before comma when "style" is "both"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var result;
            var ast;

            var expected = [{
                column: 19,
                line: 1,
                message: 'Commas should be preceded and followed by one space.'
            },
            {
                column: 24,
                line: 1,
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow missing space after comma when "style" is "both"', function () {
            var source = '.foo { color: rgb(255 ,255 ,255); }';
            var result;
            var ast;

            var expected = [{
                column: 24,
                line: 1,
                message: 'Commas should be preceded and followed by one space.'
            },
            {
                column: 29,
                line: 1,
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow one space before and after comma in mixins when "style" is "both"', function () {
            var source = '.mixin(@margin , @padding) {}';
            var result;
            var ast;

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow missing space before comma in mixins when "style" is "both"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var result;
            var ast;

            var expected = [{
                column: 8,
                line: 1,
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow missing space after comma in mixins when "style" is "both"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var result;
            var ast;

            var expected = [{
                column: 17,
                line: 1,
                message: 'Commas should be preceded and followed by one space.'
            }];

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report on operators other than commas when "style" is "both". See #49', function () {
            var source = '@var: (4 / 2);';
            var result;
            var ast;

            var options = {
                style: 'both'
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow a missing space before comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            var expected = [{
                column: 23,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            },
            {
                column: 28,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow one space before comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255 ,255 ,255); }';
            var result;
            var ast;

            var expected = [{
                column: 22,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            },
            {
                column: 27,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow a missing space before comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            var expected = [{
                column: 16,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not allow one space before comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin ,@padding) {}';
            var result;
            var ast;

            var expected = [{
                column: 15,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report on operators other than commas when "style" is "none". See #49', function () {
            var source = '@var: (4 / 2);';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not report on operators other than commas when "style" is "one_space". See #49', function () {
            var source = '@var: (4/ 2);';
            var result;
            var ast;

            var options = {
                style: 'one_space'
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should allow a missing space after comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255,255,255); }';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow one space after comma when "style" is "none"', function () {
            var source = '.foo { color: rgb(255, 255, 255); }';
            var result;
            var ast;

            var expected = [{
                column: 23,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            },
            {
                column: 28,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should allow a missing space after comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin,@padding) {}';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should not allow one space after comma in mixins when "style" is "none"', function () {
            var source = '.mixin(@margin, @padding) {}';
            var result;
            var ast;

            var expected = [{
                column: 16,
                line: 1,
                message: 'Commas should not be preceded nor followed by any space.'
            }];

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first('mixin').first('arguments');

            result = linter.lint(options, ast);

            expect(result).to.deep.equal(expected);
        });

        it('should not report on operators other than commas when "style" is "none". See #49', function () {
            var source = '@var: (4 / 2);';
            var result;
            var ast;

            var options = {
                style: 'none'
            };

            ast = parseAST(source);
            ast = ast.first('atrule').first('parentheses');

            result = linter.lint(options, ast);

            expect(result).to.be.undefined;
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { color: rgb(255 , 255 , 255); }';
            var lint;
            var ast;

            var options = {
                style: 'invalid'
            };

            ast = parseAST(source);
            ast = ast.first().first('block').first('declaration').first('value').first('function').first('arguments');

            lint = linter.lint.bind(null, options, ast);

            expect(lint).to.throw(Error);
        });
    });
});
