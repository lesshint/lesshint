'use strict';

var configLoader = require('./config-loader');
var LessHint = require('./lesshint');
var meow = require('meow');
var Vow = require('vow');

module.exports = function () {
    var lesshint = new LessHint();
    var promises = [];
    var config;

    var args = meow({
        pkg: '../package.json'
    });

    try {
        config = configLoader(args.flags.c || args.flags.config);
    } catch (e) {
        console.error("Something's wrong with the config file.");

        process.exit(1);
    }

    lesshint.configure(config);

    promises = args.input.map(lesshint.checkPath, lesshint);
    Vow.all(promises).then(function (errors) {
        errors = [].concat.apply([], errors);

        errors.forEach(function (error) {
            console.log(
                '%s %s:%d:%d %s',
                error.linter,
                error.file,
                error.line,
                error.column,
                error.message
            );
        })
    });
};
