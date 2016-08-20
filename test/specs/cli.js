/*eslint no-console: 0*/

'use strict';

var expect = require('chai').expect;
var rewire = require('rewire');
var sinon = require('sinon');
var path = require('path');

describe('cli', function () {
    var cli = rewire('../../lib/cli');

    beforeEach(function () {
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
            expect(console.error.calledOnce).to.equal(true);

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
            expect(console.error.calledOnce).to.equal(true);

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
            expect(status).to.equal(1);

            console.log.restore();
        });
    });

    it('should exit with a non-zero status code when no files were passed', function () {
        var result;

        result = cli({
            args: []
        });

        return result.fail(function (status) {
            expect(status).to.equal(66);
        });
    });

    it('should exit with a non-zero status code when invalid config file is used', function () {
        var result;

        result = cli({
            args: ['test.less'],
            config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
        });

        return result.fail(function (status) {
            expect(status).to.equal(78);
        });
    });

    it('should ignore excluded files (command-line parameter only)', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            exclude: '*.less'
        });

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should ignore excluded files (config file only)', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            config: path.dirname(__dirname) + '/data/config/config.json'
        });

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should ignore excluded files (both command-line parameter and config file)', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            config: path.dirname(__dirname) + '/data/config/exclude-only-one.json',
            exclude: 'exclude-me-too.less'
        });

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should load linters (command-line parameter only)', function () {
        var result;

        sinon.spy(console, 'log');

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            linters: ['../test/plugins/sampleLinter']
        });

        return result.fail(function (status) {
            console.log.restore();
            expect(status).to.equal(1);
        });
    });

    it('should load linters (config file only)', function () {
        var result;

        sinon.spy(console, 'log');

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/test/data/config/linters.json')
        });

        return result.fail(function (status) {
            console.log.restore();
            expect(status).to.equal(1);
        });
    });

    it('should load linters (both command-line parameter and config file)', function () {
        var result;

        sinon.spy(console, 'log');

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/test/data/config/linters.json'),
            linters: ['../test/plugins/otherSampleLinter']
        });

        return result.fail(function (status) {
            console.log.restore();
            expect(status).to.equal(1);
        });
    });

    it('should fail loading linters if a command-line linter errors', function () {
        var result;

        sinon.spy(console, 'log');

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/test/data/config/linters.json'),
            linters: ['../test/plugins/failingLinter']
        });

        return result.fail(function (status) {
            console.log.restore();
            expect(status).to.equal(70);
        });
    });

    it('should fail loading linters if a config file linter errors', function () {
        var result;

        sinon.spy(console, 'log');

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/test/data/config/linters-failing.json'),
            linters: ['../test/plugins/sampleLinter']
        });

        return result.fail(function (status) {
            console.log.restore();
            expect(status).to.equal(78);
        });
    });

    it('should exit without errors when passed a built-in reporter name', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: 'stylish'
        });

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit without errors when passed a reporter path', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: '../../lib/reporters/stylish.js'
        });

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with error when passed a invalid reporter name', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/files'],
            reporter: 'invalid-reporter'
        });

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with error when a error is thrown', function () {
        var result;

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/foo.less'],
            config: path.dirname(__dirname) + '/data/config/bad.json'
        });

        return result.fail(function (status) {
            expect(status).to.equal(70);
        });
    });

    it('should exit with a error status code when there is at least one result with a severity of "error"', function () {
        var result;

        sinon.spy(console, 'log');

        result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.dirname(__dirname) + '/data/config/severity-error.json'
        });

        return result.fail(function (status) {
            console.log.restore();
            expect(status).to.equal(2);
        });
    });
});
