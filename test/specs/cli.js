/*eslint no-console: 0*/

'use strict';

const cli = require('../../lib/cli');
const expect = require('chai').expect;
const sinon = require('sinon');
const path = require('path');

describe('cli', function () {
    beforeEach(function () {
        sinon.stub(process.stdout, 'write');
        sinon.stub(process.stderr, 'write');
    });

    afterEach(function () {
        if (process.stdout.write.restore) {
            process.stdout.write.restore();
        }

        if (process.stderr.write.restore) {
            process.stderr.write.restore();
        }
    });

    it('should exit with a zero status code when lint errors were found', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json')
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should exit with a non-zero status code when lint warnings pass `--max-warnings`', function () {
        const result = cli({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
            maxWarnings: '0',
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(1);
        });
    });

    it('should exit with a non-zero status code with three warings and `--max-warnings 2`', function () {
        const result = cli({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.resolve(process.cwd() + '/test/data/config/three-warns.json'),
            maxWarnings: '2',
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(1);
        });
    });

    it('should exit with zero status code with 2 warings and `--max-warnings 2`', function () {
        const result = cli({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.resolve(process.cwd() + '/test/data/config/two-warns.json'),
            maxWarnings: '2',
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should exit with a zero status code when lint warnings do not pass `--max-warnings`', function () {
        const result = cli({
            args: [
                path.dirname(__dirname) + '/data/files/file.less',
            ],
            config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should exit with a non-zero status code when no files were passed', function () {
        const result = cli({
            args: []
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(66);
        });
    });

    it('should exit with a non-zero status code when invalid config file is used', function () {
        const result = cli({
            args: ['test.less'],
            config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(78);
        });
    });

    it('should ignore excluded files (command-line parameter only)', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            exclude: '*.less'
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should ignore excluded files (config file only)', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            config: path.dirname(__dirname) + '/data/config/config.json'
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should ignore excluded files (both command-line parameter and config file)', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/excluded-files'],
            config: path.dirname(__dirname) + '/data/config/exclude-only-one.json',
            exclude: 'exclude-me-too.less'
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should load linters (command-line parameter only)', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            linters: ['../test/plugins/sampleLinter']
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should load linters (config file only)', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/test/data/config/linters.json')
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should load linters (both command-line parameter and config file)', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/test/data/config/linters.json'),
            linters: ['../test/plugins/otherSampleLinter']
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should fail loading linters if a config file linter errors', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.resolve(process.cwd() + '/test/data/config/linters-failing.json'),
            linters: ['../test/plugins/sampleLinter']
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(78);
        });
    });

    it('should exit without errors when passed a built-in reporter name', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: 'default'
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should exit without errors when passed a reporter path', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: path.resolve(__dirname, '../../lib/reporters/default.js')
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should exit without errors when passed a reporter object', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/ok.less'],
            reporter: {
                name: 'test',
                report: function () {}
            }
        });

        return result.then(function (result) {
            expect(result.status).to.equal(0);
        });
    });

    it('should exit with error when passed a invalid reporter name', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files'],
            reporter: 'invalid-reporter'
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(78);
        });
    });

    it('should exit with error when a error is thrown', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/foo.less'],
            config: path.dirname(__dirname) + '/data/config/bad.json'
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(70);
        });
    });

    it('should exit with a error status code when there is at least one result with a severity of "error"', function () {
        const result = cli({
            args: [path.dirname(__dirname) + '/data/files/file.less'],
            config: path.dirname(__dirname) + '/data/config/severity-error.json'
        });

        return result.catch(function (result) {
            expect(result.status).to.equal(1);
        });
    });
});
