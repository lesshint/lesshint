'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var path = require('path');
var cli = require('../../lib/cli');

function afterThenable (promise, thenable, callback) {
    var called = false;

    var result = promise[thenable](function (results) {
        called = true;
        return results;
    });

    return result.always(function (results) {
        expect(called).to.be.equal(true, 'the promise should have called .' + thenable);
        callback(results.valueOf());
    });
}

function spiedCliRun (program) {
    var logger = {
        error: sinon.spy(),
        log: sinon.spy()
    };
    var result = cli(program, logger);

    return {
        result: result,
        logger: logger,
        expectFail: function (callback) {
            return afterThenable(result, 'fail', callback);
        },
        expectThen: function (callback) {
            return afterThenable(result, 'then', callback);
        }
    };
}

describe('cli', function () {
    it('should print error on invalid config file', function () {
        var run = spiedCliRun({
            args: ['test.less'],
            config: path.join(__dirname, '../data/config/invalid.json')
        });

        return run.expectFail(function () {
            expect(run.logger.error.calledOnce).to.equal(true);
        });
    });

    it('should print error when no files are passed', function () {
        var spy = spiedCliRun({
            args: []
        });

        return spy.expectFail(function () {
            expect(spy.logger.error.calledOnce).to.equal(true);
        });
    });

    it('should exit with a non-zero status code when lint errors are found', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json')
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with a non-zero status code when lint warnings pass `--max-warnings`', function () {
        var spy = spiedCliRun({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
            maxWarnings: '0',
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with a non-zero status code with three warings and `--max-warnings 2`', function () {
        var spy = spiedCliRun({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.join(__dirname, '../data/config/three-warns.json'),
            maxWarnings: '2',
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with zero status code with 2 warings and `--max-warnings 2`', function () {
        var spy = spiedCliRun({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.join(__dirname, '../data/config/two-warns.json'),
            maxWarnings: '2',
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with a zero status code when lint warnings do not pass `--max-warnings`', function () {
        var spy = spiedCliRun({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
            maxWarnings: '999',
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with a zero status code with `--max-warnings -1` even if lint has warings', function () {
        var spy = spiedCliRun({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
            maxWarnings: '-1',
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with a non-zero status code when no files are passed', function () {
        var spy = spiedCliRun({
            args: []
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(66);
        });
    });

    it('should exit with a non-zero status code when invalid config file is used', function () {
        var spy = spiedCliRun({
            args: ['test.less'],
            config: path.join(__dirname, '../data/config/invalid.json')
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(78);
        });
    });

    it('should ignore excluded files (command-line parameter only)', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            exclude: '*.less'
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should ignore excluded files (config file only)', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            config: path.dirname(__dirname) + '/data/config/config.json'
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should ignore excluded files (both command-line parameter and config file)', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            config: path.dirname(__dirname) + '/data/config/exclude-only-one.json',
            exclude: 'exclude-me-too.less'
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should load linters (command-line parameter only)', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            linters: ['../test/plugins/sampleLinter']
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should load linters (config file only)', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.join(__dirname, '../data/config/linters.json')
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should load linters (both command-line parameter and config file)', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.join(__dirname, '../data/config/linters.json'),
            linters: ['../test/plugins/otherSampleLinter']
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should fail loading linters if a command-line linter errors', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.join(__dirname, '../data/config/linters.json'),
            linters: ['../test/plugins/failingLinter']
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(70);
        });
    });

    it('should fail loading linters if a config file linter errors', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.join(__dirname, '../data/config/linters-failing.json'),
            linters: ['../test/plugins/sampleLinter']
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(78);
        });
    });

    it('should exit without errors when passed a built-in reporter name', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: 'default'
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit without errors when passed a reporter path', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: path.join(__dirname, '../../lib/reporters/default.js')
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit without errors when passed a reporter object', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: {
                name: 'test',
                report: function () {}
            }
        });

        return spy.expectThen(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with error when passed an invalid reporter name', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files'],
            reporter: 'invalid-reporter'
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(2);
        });
    });

    it('should exit with error when a error is thrown', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/foo.less'],
            config: path.dirname(__dirname) + '/data/config/bad.json'
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(70);
        });
    });

    it('should exit with a error status code when there is at least one result with a severity of "error"', function () {
        var spy = spiedCliRun({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.dirname(__dirname) + '/data/config/severity-error.json'
        });

        return spy.expectFail(function (status) {
            expect(status).to.equal(2);
        });
    });
});
