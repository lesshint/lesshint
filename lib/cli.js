'use strict';

var configLoader = require('./config-loader');
var LessHint = require('./lesshint');
var meow = require('meow');

module.exports = function () {
    var config;
    var lesshint = new LessHint();
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
    lesshint.checkPath(args.input[0], config);
};
