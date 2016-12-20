'use strict';

var expect = require('chai').expect;
var reporter = require('../../../lib/reporters/default.js');
var sinon = require('sinon');

describe('reporter:default', function () {

    it('should not print anything when not passed any errors', function () {
        var errors = [];
        var logger = {
            log: sinon.spy()
        };

        reporter.report(errors, logger);

        expect(logger.log.called).to.equal(false);
    });

    it('should print errors with colors', function () {
        var message;
        var errors = [{
            column: 5,
            file: 'file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];
        var logger = {
            log: sinon.spy()
        };

        reporter.report(errors, logger);

        message = logger.log.getCall(0).args[0];

        expect(message).to.equal('Warning: file.less: line 1, col 5, spaceBeforeBrace: Opening curly brace should be preceded by one space.');
    });

    it('should not print line when not passed one', function () {
        var message;
        var errors = [{
            column: 5,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];
        var logger = {
            log: sinon.spy()
        };

        reporter.report(errors, logger);

        message = logger.log.getCall(0).args[0];

        expect(message).to.equal('Warning: file.less: col 5, spaceBeforeBrace: Opening curly brace should be preceded by one space.');
    });

    it('should not print column when not passed one', function () {
        var message;
        var errors = [{
            line: 1,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];
        var logger = {
            log: sinon.spy()
        };

        reporter.report(errors, logger);

        message = logger.log.getCall(0).args[0];

        expect(message).to.equal('Warning: file.less: line 1, spaceBeforeBrace: Opening curly brace should be preceded by one space.');
    });

    it('should print the result severity', function () {
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

        expect(message).to.equal('Error: file.less: line 1, spaceBeforeBrace: Opening curly brace should be preceded by one space.');
    });
});
