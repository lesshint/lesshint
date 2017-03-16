'use strict';

const RunnerError = require('../../../lib/errors/runner-error');
const expect = require('chai').expect;

describe('RunnerError', function () {
    it('should handle an Error object', function () {
        const message = 'Something went wrong';
        const error = new Error(message);

        const runnerError = new RunnerError(error, 1);

        expect(runnerError.message).to.equal(message);
    });

    it('should handle a a string', function () {
        const message = 'Something went wrong';

        const runnerError = new RunnerError(message, 1);

        expect(runnerError.message).to.equal(message);
    });

    it('should set the status', function () {
        const status = 1;
        const runnerError = new RunnerError('Something went wrong', status);

        expect(runnerError.status).to.equal(status);
    });
});
