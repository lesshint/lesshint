'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var getParser = require('../../../lib/linter').getParser;

describe('lesshint', function () {
    describe('#borderZero()', function () {
        it('should allow "none" as a value when "style" is "none" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var result;
            var parser;

            var options = {
                style: 'none'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.be.undefined;
            });
        });

        it('should allow 0 as a value when "style" is "zero" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var result;
            var parser;

            var options = {
                style: 'zero'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow 0 as a value when "style" is "none" and the property is "border"', function () {
            var source = '.foo { border: 0; }';
            var result;
            var parser;

            var expected = [{
                column: 16,
                line: 1,
                message: 'Border properties should use "none" instead of 0.'
            }];

            var options = {
                style: 'none'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should not allow "none" as a value when "style" is "zero" and the property is "border"', function () {
            var source = '.foo { border: none; }';
            var result;
            var parser;

            var expected = [{
                column: 16,
                line: 1,
                message: 'Border properties should use 0 instead of "none".'
            }];

            var options = {
                style: 'zero'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.deep.equal(expected);
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-bottom"', function () {
            var source = '.foo { border-bottom: none; }';
            var result;
            var parser;

            var options = {
                style: 'none'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-left"', function () {
            var source = '.foo { border-left: none; }';
            var result;
            var parser;

            var options = {
                style: 'none'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-right"', function () {
            var source = '.foo { border-right: none; }';
            var result;
            var parser;

            var options = {
                style: 'none'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.be.undefined;
            });
        });

        it('should allow "none" as a value when "style" is "none" and the property is "border-top"', function () {
            var source = '.foo { border-top: none; }';
            var result;
            var parser;

            var options = {
                style: 'none'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.be.undefined;
            });
        });

        it('should not do anything when there is a actual border specified', function () {
            var source = '.foo { border: 1px solid #000000; }';
            var result;
            var parser;

            var options = {
                style: 'none'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint(options, node);

                expect(result).to.be.undefined;
            });
        });

        it('should throw on invalid "style" value', function () {
            var source = '.foo { border: 0; }';
            var lint;
            var parser;

            var options = {
                style: 'invalid'
            };

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                lint = linter.lint.bind(null, options, node);

                expect(lint).to.throw(Error);
            });
        });
    });
});
