'use strict';

var fs = require('fs');
var RcFinder = require('rcfinder');
var merge = require('lodash.merge');
var stripJsonComments = require('strip-json-comments');

var loadConfig = function (path) {
    var data = fs.readFileSync(path, 'utf8');

    data = stripJsonComments(data);

    return JSON.parse(data);
};

module.exports = function (config) {
    var defaults = loadConfig(__dirname + '/config/defaults.json');
    var rcfinder;

    // Check if a config file is passed and try to load it, otherwise try and find one
    if (config) {
        config = loadConfig(config);
    } else {
        rcfinder = new RcFinder('.lesshintrc', {
            loader: loadConfig
        });

        config = rcfinder.find(process.cwd());
    }

    return merge(defaults, config);
};
