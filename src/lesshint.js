'use strict';

var fs = require('fs');
var RcFinder = require('rcfinder');
var stripJsonComments = require('strip-json-comments');

var loadConfig = function loadConfig (path) {
    var data = fs.readFileSync(path, 'utf8');

    data = stripJsonComments(data);

    return JSON.parse(data);
};

module.exports = function LessHint (path, options) {
    var config;
    var linter;
    var rcfinder;

    // Check if a config file is passed and try to load it, otherwise try and find one
    if (options.c || options.config) {
        config = options.c || options.config;
        config = loadConfig(config);
    } else {
        rcfinder = new RcFinder('.lesshintrc', {
            loader: loadConfig
        });

        config = rcfinder.find(__dirname);
    }

    linter = require('./linter');
    linter.lint(path, config);
};
