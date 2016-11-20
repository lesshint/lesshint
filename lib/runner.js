'use strict';

var configLoader = require('./config-loader');
var Lesshint = require('./lesshint');
var Vow = require('vow');

var EXIT_CODES = {
    OK: 0,
    WARNING: 1,
    ERROR: 2,
    NOINPUT: 66,
    SOFTWARE: 70,
    CONFIG: 78
};

var Runner = function (settings) {
    this.settings = settings;
};

Runner.prototype.run = function () {
    var lesshint = new Lesshint();
    var exitDefer = Vow.defer();
    var exitPromise = exitDefer.promise();
    var promises = [];
    var config;

    if (!this.settings.args.length) {
        exitDefer.reject({
            code: EXIT_CODES.NOINPUT,
            errors: ['No files to lint were passed. See lesshint -h']
        });

        return exitPromise;
    }

    try {
        config = configLoader(this.settings.config);
        config = config || {};
        config.excludedFiles = config.excludedFiles || [];
        config.linters = config.linters || [];

        if (this.settings.exclude) {
            config.excludedFiles.push(this.settings.exclude);
        }

        if (this.settings.linters) {
            config.linters.push.apply(config.linters, this.settings.linters);
        }
    } catch (e) {
        exitDefer.reject({
            code: EXIT_CODES.CONFIG,
            errors: ['Something\'s wrong with the config file. Error: ' + e.message]
        });

        return exitPromise;
    }

    lesshint.configure(config);

    promises = this.settings.args.map(lesshint.checkPath, lesshint);
    Vow.all(promises).then(function (results) {
        var hasError;
        var maxWarnings;
        var reporter;
        var warnings;

        results = [].concat.apply([], results);

        reporter = lesshint.getReporter(this.settings.reporter);

        if (reporter) {
            reporter.report(results);
        } else {
            exitDefer.resolve({
                code: EXIT_CODES.ERROR,
                errors: ['Could not find reporter ' + this.settings.reporter + '.']
            });

            return;
        }

        if (!results.length) {
            exitDefer.resolve({
                code: EXIT_CODES.OK
            });

            return;
        }

        hasError = results.some(function (result) {
            return result.severity === 'error';
        });

        if (hasError) {
            exitDefer.reject({
                code: EXIT_CODES.ERROR
            });

            return;
        }

        maxWarnings = parseInt(this.settings.maxWarnings, 10) || 0;

        if (maxWarnings === -1) {
            exitDefer.resolve({
                code: EXIT_CODES.OK
            });

            return;
        }

        warnings = results.reduce(function (sum, result) {
            return sum + (result.severity === 'warning' ? 1 : 0);
        }, 0);

        if (warnings > maxWarnings) {
            exitDefer.reject({
                code: EXIT_CODES.WARNING
            });
        } else {
            exitDefer.resolve({
                code: EXIT_CODES.OK
            });
        }
    }, this).fail(function (error) {
        exitDefer.reject({
            code: EXIT_CODES.SOFTWARE,
            errors: [
                'An unknown error occurred when checking "' + error.lesshintFile + '", please file an issue with this info:',
                error.stack
            ]
        });
    }, this);

    return exitPromise;
};

module.exports = Runner;
