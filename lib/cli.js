'use strict';

var configLoader = require('./config-loader');
var LessHint = require('./lesshint');
var chalk = require('chalk');
var exit = require('exit');
var Vow = require('vow');

var EXIT_CODES = {
    OK: 0,
    WARNING: 1,
    NOINPUT: 66,
    CONFIG: 78
};

module.exports = function (program) {
    var lesshint = new LessHint();
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
    }

    try {
        config = configLoader(program.config);
    } catch (e) {
        console.error('Something\'s wrong with the config file. Error: ' + e.message);

        exitDefer.reject(EXIT_CODES.CONFIG);
    }

    lesshint.configure(config);

    promises = program.args.map(lesshint.checkPath, lesshint);
    Vow.all(promises).then(function (errors) {
        errors = [].concat.apply([], errors);

        if (!errors.length) {
            exitDefer.resolve(EXIT_CODES.OK);

            return;
        }

        errors.forEach(function (error) {
            var output = '';

            output += chalk.cyan(error.file) + ': ';

            if (error.line) {
                output += chalk.magenta('line ' + error.line) + ', ';
            }

            if (error.column) {
                output += chalk.magenta('col ' + error.column) + ', ';
            }

            output += chalk.green(error.linter) + ': ';
            output += error.message;

            console.log(output);
        });

        exitDefer.reject(EXIT_CODES.WARNING);
    });

    return exitPromise;
};
