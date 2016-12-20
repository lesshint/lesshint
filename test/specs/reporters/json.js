'use strict';

var expect = require('chai').expect;
var reporter = require('../../../lib/reporters/json.js');
var sinon = require('sinon');

describe('reporter:json', function () {
    it('should print an error completely', function () {
        var message;
        var errors = [{
            line: 1,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            severity: 'error',
            source: '.foo{ color: red; }'
        }];
        var logger = {
            log: sinon.spy()
        };

        reporter.report(errors, logger);

        message = logger.log.getCall(0).args[0];

        expect(message).to.equal(JSON.stringify(errors));
    });
});
