'use strict';

var expect = require('chai').expect;
var rewire = require('rewire');
var sinon = require('sinon');
var util = require('util');

describe('reporter:teamcity', function () {
    var reporter = rewire('../../../lib/reporters/teamcity.js');

    beforeEach(function () {
        sinon.stub(process.stdout, 'write');
    });

    afterEach(function () {
        if (process.stdout.write.restore) {
            process.stdout.write.restore();
        }
    });

    it('should not print anything when not passed any errors', function () {
        var errors = [];

        sinon.spy(console, 'log');

        reporter.report(errors);

        expect(console.log.called).to.equal(true);
        expect(console.log.getCall(0).args[0]).to.equal('##teamcity[testSuiteStarted name=\'LessHint\']');
        expect(console.log.getCall(1).args[0]).to.equal('##teamcity[testStarted name=\'LessHint\']');
        expect(console.log.getCall(2).args[0]).to.equal('##teamcity[testFinished name=\'LessHint\']');
        expect(console.log.getCall(3).args[0]).to.equal('##teamcity[testSuiteFinished name=\'LessHint\']');

        console.log.restore();
    });

    it('print error for 1 file', function () {
        var errors = [{
            column: 5,
            file: 'file.less',
            fullPath: 'path/to/file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            severity: 'error',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');
        sinon.spy(util, 'format');

        reporter.report(errors);

        expect(console.log.called).to.equal(true);
        expect(util.format.called).to.equal(true);
        expect(console.log.getCall(1).args[0]).to.equal('##teamcity[testStarted name=\'path/to/file.less\']');
        expect(console.log.getCall(2).args[0]).to.equal(
            '##teamcity[testFailed name=\'path/to/file.less\' message=\'line 1, col 5,'
            + ' Error (spaceBeforeBrace) Opening curly brace should be preceded by one space.\']'
        );

        console.log.restore();
    });

    it('print errors for 2 files', function () {
        var errors = [{
            column: 5,
            file: 'file.less',
            fullPath: 'path/to/file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            severity: 'error',
            source: '.foo{ color: red; }'
        }, {
            column: 5,
            file: 'file.less',
            fullPath: 'path/to/file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            severity: 'warning',
            source: '.foo{ color: red; }'
        }, {
            column: 5,
            file: 'file.less',
            fullPath: 'path/to/another/file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            severity: 'warning',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');

        reporter.report(errors);

        expect(console.log.called).to.equal(true);
        expect(util.format.called).to.equal(true);
        expect(console.log.getCall(1).args[0]).to.equal('##teamcity[testStarted name=\'path/to/file.less\']');
        expect(console.log.getCall(2).args[0]).to.equal(
            '##teamcity[testFailed name=\'path/to/file.less\' message=\'line 1, col 5,'
            + ' Error (spaceBeforeBrace) Opening curly brace should be preceded by one space.\']'
        );
        expect(console.log.getCall(6).args[0]).to.equal(
            '##teamcity[testFailed name=\'path/to/another/file.less\' message=\'line 1, col 5,'
            + ' Warning (spaceBeforeBrace) Opening curly brace should be preceded by one space.\']'
        );

        console.log.restore();
    });
});
