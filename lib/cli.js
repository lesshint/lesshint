'use strict';

var configLoader = require('./config-loader');
var LessHint = require('./lesshint');
var Vow = require('vow');

module.exports = function (program) {
    var lesshint = new LessHint();
    var promises = [];
    var config;

    if (!program.args.length) {
        console.error('No files to lint were passed. See lesshint -h');

        return;
    }

    try {
        config = configLoader(program.config);
    } catch (e) {
        console.error('Something\'s wrong with the config file.');

        return;
    }

    lesshint.configure(config);

    promises = program.args.map(lesshint.checkPath, lesshint);
    Vow.all(promises).then(function (errors) {
        errors = [].concat.apply([], errors);

        errors.forEach(function (error) {
            console.log(
                '%s %s:%d %s',
                error.linter,
                error.file,
                error.line,
                error.message
            );
        });
    });
};
