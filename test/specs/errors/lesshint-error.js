'use strict';

const LesshintError = require('../../../lib/errors/lesshint-error');
const expect = require('chai').expect;
const path = require('path');

describe('LesshintError', function () {
    it('should handle an Error object', function () {
        const message = 'Something went wrong';
        const error = new Error(message);

        const lesshintError = new LesshintError(error, '/path/to/file.less');

        expect(lesshintError.message).to.equal(message);
    });

    it('should handle a a string', function () {
        const message = 'Something went wrong';

        const lesshintError = new LesshintError(message, '/path/to/file.less');

        expect(lesshintError.message).to.equal(message);
    });

    it('should resolve paths', function () {
        const file = 'file.less';
        const errorPath = path.resolve(process.cwd(), file);

        const lesshintError = new LesshintError('Something went wrong', file);

        expect(lesshintError.path).to.equal(errorPath);
    });
});
