'use strict';

const expect = require('chai').expect;

describe('lesshint', function () {
    const api = require('../../lib/index');

    it('should expose Lesshint class in public API', function () {
        expect(api.Lesshint).to.be.a('function');
    });

    it('should expose Runner class in public API', function () {
        expect(api.Runner).to.be.a('function');
    });

    it('should expose utils class in public API', function () {
        expect(api.utils).to.be.a('object');
    });
});
