'use strict';

const hasQuotes = require('../../../lib/utils/has-quotes');
const expect = require('chai').expect;

describe('utils/has-newline', function () {
    it('checks for any quotes', function () {
        const result = hasQuotes('"foo"', 'any');

        expect(result).to.be.true;
    });

    it('checks for double quotes', function () {
        const result = hasQuotes('"', 'double');

        expect(result).to.be.true;
    });

    it('checks for single quotes', function () {
        const result = hasQuotes("'", 'single');

        expect(result).to.be.true;
    });

    it('checks for any quotes anywhere in the string', function () {
        const result = hasQuotes('foo \'" bar');

        expect(result).to.be.true;
    });

    it('checks for double quotes anywhere in the string', function () {
        const result = hasQuotes('foo " bar', 'double');

        expect(result).to.be.true;
    });

    it('checks for single quotes anywhere in the string', function () {
        const result = hasQuotes("foo ' bar", 'single');

        expect(result).to.be.true;
    });
});
