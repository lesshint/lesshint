var assert = require('assert');
var rewire = require('rewire');
var chalk = require('chalk');
var sinon = require('sinon');

/*
 * The Chalk object is read-only so we'll need to stub everything for
 * Sinon to work.
 */
var chalkStub = Object.create(chalk, {
    cyan: {
        value: function (str) {
            return chalk.cyan(str);
        },
        writable: true
    },
    green: {
        value: function (str) {
            return chalk.green(str);
        },
        writable: true
    },
    magenta: {
        value: function (str) {
            return chalk.magenta(str);
        },
        writable: true
    }
});

describe('reporter:stylish', function () {
    var reporter = rewire('../../../lib/reporters/stylish.js');
    var colorsEnabled = chalk.enabled;

    beforeEach(function () {
        chalk.enabled = false;

        sinon.stub(process.stdout, 'write');

        reporter.__set__('chalk', chalkStub);
    });

    afterEach(function () {
        if (process.stdout.write.restore) {
            process.stdout.write.restore();
        }

        chalk.enabled = colorsEnabled;
    });

    it('should not print anything when not passed any errors', function () {
        var errors = [];

        sinon.spy(console, 'log');

        reporter(errors);

        assert(console.log.called === false);
        console.log.restore();
    });

    it('should print errors with colors', function () {
        var errors = [{
            column: 5,
            file: 'file.less',
            line: 1,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');
        sinon.spy(chalkStub, 'cyan');
        sinon.spy(chalkStub, 'green');
        sinon.spy(chalkStub, 'magenta');

        reporter(errors);

        assert.strictEqual(chalkStub.cyan.called, true);
        assert.strictEqual(chalkStub.green.called, true);
        assert.strictEqual(chalkStub.magenta.called, true);
        assert.strictEqual(chalk.stripColor(console.log.getCall(0).args[0]), 'file.less: line 1, col 5, spaceBeforeBrace: Opening curly brace should be preceded by one space.');

        console.log.restore();
    });

    it('should not print line when not passed one', function () {
        var errors = [{
            column: 5,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');

        reporter(errors);

        assert.strictEqual(chalk.stripColor(console.log.getCall(0).args[0]), 'file.less: col 5, spaceBeforeBrace: Opening curly brace should be preceded by one space.');

        console.log.restore();
    });

    it('should not print column when not passed one', function () {
        var errors = [{
            line: 1,
            file: 'file.less',
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.',
            source: '.foo{ color: red; }'
        }];

        sinon.spy(console, 'log');

        reporter(errors);

        assert.strictEqual(chalk.stripColor(console.log.getCall(0).args[0]), 'file.less: line 1, spaceBeforeBrace: Opening curly brace should be preceded by one space.');

        console.log.restore();
    });
});
