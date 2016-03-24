'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var parseAST = require('../../../lib/linter').parseAST;

describe('lesshint', function () {
    describe('#decimalZero()', function () {
        var result;
        var ast;
        var options;
        var expected;

        describe('when "style" is "leading"', function () {
            beforeEach(function () {
                options = {
                    style: 'leading'
                };
            });

            it('should allow "0.0"', function () {
                ast = parseAST('.foo { font-size: 0.0em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should allow number without decimal zero', function () {
                ast = parseAST('.foo { font-size: 1em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should allow number with leading decimal zero', function () {
                ast = parseAST('.foo { font-size: 0.5em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should allow decimal number greater than 1 without leading zero', function () {
                ast = parseAST('.foo { font-size: 1.25em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should not allow number without leading decimal zero', function () {
                expected = [{
                    column: 19,
                    line: 1,
                    message: '.5 should be written with leading zero.'
                }];

                ast = parseAST('.foo { font-size: .5em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number without leading decimal zero in a function', function () {
                expected = [{
                    column: 29,
                    line: 1,
                    message: '.5 should be written with leading zero.'
                }];

                ast = parseAST('.foo { color: rgba(0, 0, 0, .5); }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });
        });//"leading"

        describe('when "style" is "trailing"', function () {
            beforeEach(function () {
                options = {
                    style: 'trailing'
                };
            });

            it('should allow "0.0"', function () {
                ast = parseAST('.foo { font-size: 0.0em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should allow number without decimal', function () {
                ast = parseAST('.foo { font-size: 1em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should allow number with trailing decimal zero', function () {
                ast = parseAST('.foo { font-size: 1.0em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should not allow number without trailing decimal zero', function () {
                expected = [{
                    column: 19,
                    line: 1,
                    message: '1.5 should be written with trailing zero.'
                }];

                ast = parseAST('.foo { font-size: 1.5em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number without trailing decimal zero in a function', function () {
                expected = [{
                    column: 29,
                    line: 1,
                    message: '0.1 should be written with trailing zero.'
                }];

                ast = parseAST('.foo { color: rgba(0, 0, 0, 0.1); }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });
        });//"trailing"

        describe('when "style" is "both"', function () {
            beforeEach(function () {
                options = {
                    style: 'both'
                };
            });

            it('should allow "0.0"', function () {
                ast = parseAST('.foo { font-size: 0.0em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should allow decimal number greater than 1 without leading zero', function () {
                ast = parseAST('.foo { font-size: 1.250em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should not allow number without trailing decimal zero', function () {
                expected = [{
                    column: 19,
                    line: 1,
                    message: '1.5 should be written with leading and trailing zero.'
                }];

                ast = parseAST('.foo { font-size: 1.5em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number without trailing decimal zero in a function', function () {
                expected = [{
                    column: 29,
                    line: 1,
                    message: '1.5 should be written with leading and trailing zero.'
                }];

                ast = parseAST('.foo { color: rgba(0, 0, 0, 1.5); }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number without leading decimal zero', function () {
                expected = [{
                    column: 19,
                    line: 1,
                    message: '.50 should be written with leading and trailing zero.'
                }];

                ast = parseAST('.foo { font-size: .50em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number without leading decimal zero in a function', function () {
                expected = [{
                    column: 29,
                    line: 1,
                    message: '.50 should be written with leading and trailing zero.'
                }];

                ast = parseAST('.foo { color: rgba(0, 0, 0, .50); }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });
        });//"both"

        describe('when "style" is "none"', function () {
            beforeEach(function () {
                options = {
                    style: 'none'
                };
            });

            it('should allow "0.0"', function () {
                ast = parseAST('.foo { font-size: 0.0em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.be.undefined;
            });

            it('should not allow number with trailing decimal zero', function () {
                expected = [{
                    column: 19,
                    line: 1,
                    message: '.50 should be written without leading and trailing zero.'
                }];

                ast = parseAST('.foo { font-size: .50em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number with trailing decimal zero in a function', function () {
                expected = [{
                    column: 29,
                    line: 1,
                    message: '.50 should be written without leading and trailing zero.'
                }];

                ast = parseAST('.foo { color: rgba(0, 0, 0, .50); }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number with leading decimal zero', function () {
                expected = [{
                    column: 19,
                    line: 1,
                    message: '0.5 should be written without leading and trailing zero.'
                }];

                ast = parseAST('.foo { font-size: 0.5em; }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });

            it('should not allow number with trailing decimal zero in a function', function () {
                expected = [{
                    column: 29,
                    line: 1,
                    message: '0.5 should be written without leading and trailing zero.'
                }];

                ast = parseAST('.foo { color: rgba(0, 0, 0, 0.5); }')
                        .first()
                        .first('block')
                        .first('declaration');

                result = linter.lint(options, ast);

                expect(result).to.deep.equal(expected);
            });
        });//"none"

        describe('with invalid "style" value', function () {
            beforeEach(function () {
                options = {
                    style: 'invalid'
                };
            });

            it('should throw an error', function () {
                var lint;

                ast = parseAST('.foo { font-size: 1.0em; }')
                    .first()
                    .first('block')
                    .first('declaration');

                lint = linter.lint.bind(null, options, ast);

                expect(lint).to.throw(Error);
            });
        });//"invalid"
    });
});
