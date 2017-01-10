/*eslint no-console: 0*/

'use strict';

const reporter = require('../../../lib/reporters/default.js');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('reporter:default', function () {
    beforeEach(function () {
        sinon.stub(process.stdout, 'write');
    });

    afterEach(function () {
        if (process.stdout.write.restore) {
            process.stdout.write.restore();
        }
    });

    it('should not print anything when not passed any errors', function () {
        const errors = [];

        sinon.spy(console, 'log');

        reporter.report(errors);

        expect(console.log.called).to.equal(false);

        console.log.restore();
    });

    it('should print errors with colors', function () {
        const errors = [{
            column: 5,
            file: 'file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');

        reporter.report(errors);

        const message = console.log.getCall(0).args[0];

        expect(message).to.equal('Warning: file.less: line 1, col 5, spaceBeforeBrace: Opening curly brace should be preceded by one space.');

        console.log.restore();
    });

    it('should not print line when not passed one', function () {
        const errors = [{
            column: 5,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');

        reporter.report(errors);

        const message = console.log.getCall(0).args[0];

        expect(message).to.equal('Warning: file.less: col 5, spaceBeforeBrace: Opening curly brace should be preceded by one space.');

        console.log.restore();
    });

    it('should not print column when not passed one', function () {
        const errors = [{
            line: 1,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');

        reporter.report(errors);

        const message = console.log.getCall(0).args[0];

        expect(message).to.equal('Warning: file.less: line 1, spaceBeforeBrace: Opening curly brace should be preceded by one space.');

        console.log.restore();
    });

    it('should print the result severity', function () {
        const errors = [{
            line: 1,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            severity: 'error',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');

        reporter.report(errors);

        const message = console.log.getCall(0).args[0];

        expect(message).to.equal('Error: file.less: line 1, spaceBeforeBrace: Opening curly brace should be preceded by one space.');

        console.log.restore();
    });
});
