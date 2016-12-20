'use strict';

var expect = require('chai').expect;
var rewire = require('rewire');
var sinon = require('sinon');
var path = require('path');

describe('cli', function () {
    var cli = rewire('../../lib/cli');

    beforeEach(function () {
        cli.__set__('exit', function () {});
    });

    it('should print error on invalid config file', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: ['test.less'],
                config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
            },
            logger);

        return result.fail(function () {
            expect(logger.error.calledOnce).to.equal(true);
        });
    });

    it('should print error when no files are passed', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: []
            },
            logger);

        return result.fail(function () {
            expect(logger.error.calledOnce).to.equal(true);
        });
    });

    it('should exit with a non-zero status code when lint errors were found', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/file.less'],
                config: path.resolve(process.cwd() + '/lib/config/defaults.json')
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with a non-zero status code when lint warnings pass `--max-warnings`', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [
                    path.dirname(__dirname) + '/data/files/file.less',
                ],
                config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
                maxWarnings: '0',
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with a non-zero status code with three warings and `--max-warnings 2`', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [
                    path.dirname(__dirname) + '/data/files/file.less',
                ],
                config: path.resolve(process.cwd() + '/test/data/config/three-warns.json'),
                maxWarnings: '2',
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with zero status code with 2 warings and `--max-warnings 2`', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [
                    path.dirname(__dirname) + '/data/files/file.less',
                ],
                config: path.resolve(process.cwd() + '/test/data/config/two-warns.json'),
                maxWarnings: '2',
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with a zero status code when lint warnings do not pass `--max-warnings`', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [
                    path.dirname(__dirname) + '/data/files/file.less',
                ],
                config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
                maxWarnings: '999',
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with a zero status code with `--max-warnings -1` even if lint has warings', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [
                    path.dirname(__dirname) + '/data/files/file.less',
                ],
                config: path.resolve(process.cwd() + '/lib/config/defaults.json'),
                maxWarnings: '-1',
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with a non-zero status code when no files were passed', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: []
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(66);
        });
    });

    it('should exit with a non-zero status code when invalid config file is used', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: ['test.less'],
                config: path.resolve(process.cwd() + '/test/data/config/invalid.json')
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(78);
        });
    });

    it('should ignore excluded files (command-line parameter only)', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/excluded-files'],
                exclude: '*.less'
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should ignore excluded files (config file only)', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/excluded-files'],
                config: path.dirname(__dirname) + '/data/config/config.json'
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should ignore excluded files (both command-line parameter and config file)', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/excluded-files'],
                config: path.dirname(__dirname) + '/data/config/exclude-only-one.json',
                exclude: 'exclude-me-too.less'
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should load linters (command-line parameter only)', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/file.less'],
                linters: ['../test/plugins/sampleLinter']
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should load linters (config file only)', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/file.less'],
                config: path.resolve(process.cwd() + '/test/data/config/linters.json')
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should load linters (both command-line parameter and config file)', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/file.less'],
                config: path.resolve(process.cwd() + '/test/data/config/linters.json'),
                linters: ['../test/plugins/otherSampleLinter']
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should fail loading linters if a command-line linter errors', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/file.less'],
                config: path.resolve(process.cwd() + '/test/data/config/linters.json'),
                linters: ['../test/plugins/failingLinter']
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(70);
        });
    });

    it('should fail loading linters if a config file linter errors', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/file.less'],
                config: path.resolve(process.cwd() + '/test/data/config/linters-failing.json'),
                linters: ['../test/plugins/sampleLinter']
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(78);
        });
    });

    it('should exit without errors when passed a built-in reporter name', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/ok.less'],
                reporter: 'stylish'
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit without errors when passed a reporter path', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/ok.less'],
                reporter: '../../lib/reporters/stylish.js'
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit without errors when passed a reporter object', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/ok.less'],
                reporter: {
                    name: 'test',
                    report: function () {}
                }
            },
            logger);

        return result.then(function (status) {
            expect(status).to.equal(0);
        });
    });

    it('should exit with error when passed a invalid reporter name', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files'],
                reporter: 'invalid-reporter'
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(1);
        });
    });

    it('should exit with error when a error is thrown', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/foo.less'],
                config: path.dirname(__dirname) + '/data/config/bad.json'
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(70);
        });
    });

    it('should exit with a error status code when there is at least one result with a severity of "error"', function () {
        var logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        var result = cli(
            {
                args: [path.dirname(__dirname) + '/data/files/file.less'],
                config: path.dirname(__dirname) + '/data/config/severity-error.json'
            },
            logger);

        return result.fail(function (status) {
            expect(status).to.equal(2);
        });
    });
});
