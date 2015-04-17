'use strict';

var configLoader = require('./config-loader');
var Checker = require('./checker');
var meow = require('meow');

module.exports = function cli () {
    var config;
    var checker = new Checker();
    var args = meow({
        pkg: '../package.json'
    });

    try {
        config = configLoader(args.flags.c || args.flags.config);
    } catch (e) {
        console.log('Something\'s wrong with the config file.');

        process.exit(1);
    }

    checker.configure(config);
    checker.checkPath(args.input[0], config);
};
