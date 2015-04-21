var assert = require('assert');
var path = require('path');
var sinon = require('sinon');

describe('cli', function () {
    var cli = require('../../lib/cli');

    beforeEach(function() {
        sinon.stub(process.stderr, 'write');
    });

    afterEach(function () {
        if (process.stderr.write.restore) {
            process.stderr.write.restore();
        }
    });

    it('should print error on invalid config file', function () {
        sinon.spy(console, 'error');

        cli({
            args: ['test.less'],
            config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
        });

        // We can't really be sure of the JSON.parse() error message, so we'll just check that the beginning is correct
        assert(console.error.getCall(0).args[0].indexOf('Something\'s wrong with the config file. Error: ') === 0);
        console.error.restore();
    });

    it('should print error when no files are passed', function () {
        sinon.spy(console, 'error');

        cli({
            args: []
        });

        assert(console.error.getCall(0).args[0] === 'No files to lint were passed. See lesshint -h');
        console.error.restore();
    });
});
