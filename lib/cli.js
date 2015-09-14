'use strict';

var configLoader = require('./config-loader');
var Lesshint = require('./lesshint');
var path = require('path');
var exit = require('exit');
var Vow = require('vow');
var fs = require('fs');

var EXIT_CODES = {
    OK: 0,
    WARNING: 1,
    NOINPUT: 66,
    CONFIG: 78
};

var getReporter = function (reporter) {
    var reporterPath;

    // stylish is the default
    reporter = reporter || 'stylish';

    // Check our core reporters first
    try {
        reporterPath = path.resolve(__dirname, './reporters/' + reporter + '.js');

        return require(reporterPath);
    } catch (e) {}

    // Try to find it somewhere else
    try {
        reporterPath = path.resolve(process.cwd(), reporter);

        return require(reporterPath);
    } catch (e) {}

    // Try to load it as a module
    try {
        return require(reporter);
    } catch (e) {}

    return false;
};

module.exports = function (program) {
    var lesshint = new Lesshint();
    var exitDefer = Vow.defer();
    var exitPromise = exitDefer.promise();
    var promises = [];
    var config;

    exitPromise.always(function (status) {
        exit(status.valueOf());
    });

    if (!program.args.length) {
        console.error('No files to lint were passed. See lesshint -h');

        exitDefer.reject(EXIT_CODES.NOINPUT);

        return exitPromise;
    }

    try {
        config = configLoader(program.config);
        config = config || {};

        config.excludedFiles = program.exclude ? [program.exclude] : [];
    } catch (e) {
        console.error('Something\'s wrong with the config file. Error: ' + e.message);

        exitDefer.reject(EXIT_CODES.CONFIG);

        return exitPromise;
    }

    lesshint.configure(config);

    promises = program.args.map(lesshint.checkPath, lesshint);
    Vow.all(promises).then(function (results) {
        var reporter;

        results = [].concat.apply([], results);

        if (!results.length) {
            exitDefer.resolve(EXIT_CODES.OK);

            return;
        }

        reporter = getReporter(program.reporter);

        if (reporter) {
            reporter(results);
        } else {
            console.error('Could not find reporter "%s".', program.reporter);
        }

        exitDefer.reject(EXIT_CODES.WARNING);
    });

    return exitPromise;
};
