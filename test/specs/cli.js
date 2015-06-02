var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');
var path = require('path');

describe('cli', function () {
    var cli = rewire('../../lib/cli');

    beforeEach(function() {
        sinon.stub(process.stdout, 'write');
        sinon.stub(process.stderr, 'write');

        cli.__set__('exit', function () {});
    });

    afterEach(function () {
        if (process.stdout.write.restore) {
            process.stdout.write.restore();
        }

        if (process.stderr.write.restore) {
            process.stderr.write.restore();
        }
    });

    it('should print error on invalid config file', function () {
        var result;

        sinon.spy(console, 'error');

        result = cli({
            args: ['test.less'],
            config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
        });

        return result.fail(function () {
            // We can't really be sure of the JSON.parse() error message, so we'll just check that the beginning is correct
            assert(console.error.getCall(0).args[0].indexOf('Something\'s wrong with the config file. Error: ') === 0);
            console.error.restore();
        });
    });

    it('should print error when no files are passed', function () {
        var result;

        sinon.spy(console, 'error');

        result = cli({
            args: []
        });

        return result.fail(function () {
            assert(console.error.getCall(0).args[0] === 'No files to lint were passed. See lesshint -h');
            console.error.restore();
        });
    });

    it('should exit with a non-zero status code when lint errors were found', function () {
        var result;

        sinon.spy(console, 'log');

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json')
        });

        return result.fail(function (status) {
            assert.ok(status === 1);

            console.log.restore();
        });
    });

    it('should exit with a non-zero status code when no files were passed', function () {
        var result;

        result = cli({
            args: []
        });

        return result.fail(function (status) {
            assert.ok(status === 66);
        });
    });

    it('should exit with a non-zero status code when invalid config file is used', function () {
        var result;

        result = cli({
            args: ['test.less'],
            config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
        });

        return result.fail(function (status) {
            assert.ok(status === 78);
        });
    });

    it('should exit with a zero status code when everything is alright', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
        });

        return result.fail(function (status) {
            assert.ok(status === 78);
        });
    });

    it('should ignore excluded files', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/files'],
            exclude: '*.less'
        });

        return result.then(function (status) {
            assert.ok(status === 0);
        });
    });
});
