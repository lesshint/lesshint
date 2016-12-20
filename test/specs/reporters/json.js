/*eslint no-console: 0*/

'use strict';

var expect = require('chai').expect;
var rewire = require('rewire');
var sinon = require('sinon');

describe('reporter:json', function () {
    var reporter = rewire('../../../lib/reporters/json.js');

    beforeEach(function () {
        sinon.stub(process.stdout, 'write');
    });

    afterEach(function () {
        if (process.stdout.write.restore) {
            process.stdout.write.restore();
        }
    });

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

        sinon.spy(console, 'log');

        reporter.report(errors);

        message = console.log.getCall(0).args[0];

        expect(message).to.equal(JSON.stringify(errors));

        console.log.restore();
    });
});
