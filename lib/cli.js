'use strict';

var configLoader = require('./config-loader');
var LessHint = require('./lesshint');
var exit = require('exit');
var Vow = require('vow');

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

        exitDefer.reject(66);
    }

    try {
        config = configLoader(program.config);
    } catch (e) {
        console.error('Something\'s wrong with the config file. Error: ' + e.message);

        exitDefer.reject(78);
    }

    lesshint.configure(config);

    promises = program.args.map(lesshint.checkPath, lesshint);
    Vow.all(promises).then(function (errors) {
        errors = [].concat.apply([], errors);

        if (!errors.length) {
            exitDefer.resolve(0);

            return;
        }

        errors.forEach(function (error) {
            console.log(
                '%s %s:%d %s',
                error.linter,
                error.file,
                error.line,
                error.message
            );
        });

        exitDefer.reject(1);
    });

    return exitPromise;
};
