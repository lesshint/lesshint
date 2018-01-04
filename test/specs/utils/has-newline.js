'use strict';

const hasNewline = require('../../../lib/utils/has-newline');
const expect = require('chai').expect;

describe('utils/has-newline', function () {
    it('should recognize line feeds', function () {
        const result = hasNewline('\n');

        expect(result).to.be.true;
    });

    it('should recognize carriage returns', function () {
        const result = hasNewline('\r\n');

        expect(result).to.be.true;
    });

    it('should not recognize strings without newlines', function () {
        const result = hasNewline('foo');

        expect(result).to.be.false;
    });
});
