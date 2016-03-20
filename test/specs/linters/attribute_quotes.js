'use strict';

var path = require('path');
var expect = require('chai').expect;
var linter = require('../../../lib/linters/' + path.basename(__filename));
var getParser = require('../../../lib/linter').getParser;

describe('lesshint', function () {
    describe('#attributeQuotes()', function () {
        it('should allow single quotes', function () {
            var source = "input[type='text'] {}";
            var result;
            var parser;

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should allow double quotes', function () {
            var source = 'input[type="text"] {}';
            var result;
            var parser;

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint({}, ast.root.first);

                expect(result).to.be.undefined;
            });
        });

        it('should not allow missing quotes', function () {
            var source = 'input[type=text] {}';
            var result;
            var parser;

            var expected = [{
                column: 12,
                line: 1,
                message: 'Attribute selectors should use quotes.'
            }];

            parser = getParser(source);
            parser.then(function (ast) {
                var node = ast.root.nodes[0].nodes[0];

                result = linter.lint({}, ast.root.first);

                expect(result).to.deep.equal(expected);
            });
        });
    });
});
