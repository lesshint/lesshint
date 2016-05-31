'use strict';

var stripJsonComments = require('strip-json-comments');
var RcFinder = require('rcfinder');
var fs = require('fs');

var loadConfig = function (path) {
    var data = fs.readFileSync(path, 'utf8');

    data = stripJsonComments(data);

    // Strip BOM
    if (data.charCodeAt(0) === 0xFEFF) {
        data = data.slice(1);
    }

    return JSON.parse(data);
};

module.exports = function (config) {
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

    return config;
};
