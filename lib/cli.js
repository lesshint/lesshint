'use strict';

var configLoader = require('./config-loader');
var linter = require('./linter');
var meow = require('meow');

module.exports = function cli () {
    var config;
    var args = meow({
        pkg: '../package.json'
    });

    try {
        config = configLoader(args.flags.c || args.flags.config);
    } catch (e) {
        console.log('Something\'s wrong with the config file.');

        process.exit(1);
    }

    linter.lint(args.input[0], config);
};
