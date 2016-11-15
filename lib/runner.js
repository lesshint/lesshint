/*eslint no-console: 0*/

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
        console.error('No files to lint were passed. See lesshint -h');

        exitDefer.reject(EXIT_CODES.NOINPUT);

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
        console.error("Something's wrong with the config file. Error: " + e.message);

        exitDefer.reject(EXIT_CODES.CONFIG);

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
            console.error('Could not find reporter "%s".', this.settings.reporter);
        }

        if (!results.length) {
            exitDefer.resolve(EXIT_CODES.OK);

            return;
        }

        hasError = results.some(function (result) {
            return result.severity === 'error';
        });

        if (hasError) {
            exitDefer.reject(EXIT_CODES.ERROR);
        } else {
            maxWarnings = parseInt(this.settings.maxWarnings, 10) || 0;

            if (maxWarnings === -1) {
                exitDefer.resolve(EXIT_CODES.OK);
                return;
            }

            warnings = results.reduce(function (sum, result) {
                return sum + (result.severity === 'warning' ? 1 : 0);
            }, 0);

            if (warnings > maxWarnings) {
                exitDefer.reject(EXIT_CODES.WARNING);
            } else {
                exitDefer.resolve(EXIT_CODES.OK);
            }
        }
    }, this).fail(function (error) {
        console.error('An unknown error occurred when checking "%s", please file an issue with this info:', error.lesshintFile);
        console.error(error.stack);

        exitDefer.reject(EXIT_CODES.SOFTWARE);
    }, this);

    return exitPromise;
};

module.exports = Runner;
