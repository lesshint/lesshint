'use strict';

var configLoader = require('./config-loader');
var linter = require('./linter');
var meow = require('meow');

module.exports = function () {
    var config;
    var cli = meow({
        pkg: '../package.json'
    });

    try {
        config = configLoader(cli.flags.c || cli.flags.config);
    } catch (e) {
        console.log('Something\'s wrong with the config file.');

        process.exit(1);
    }

    linter.lint(cli.input[0], config);
};
