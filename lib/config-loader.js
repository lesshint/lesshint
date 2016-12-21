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

module.exports = function (path) {
    var rcfinder;
    var config;
    var stats;

    path = path || process.cwd();
    stats = fs.statSync(path);

    if (stats.isFile()) {
        // A file was passed, try to load it
        config = loadConfig(path);
    } else {
        // Try to find a config file instead
        rcfinder = new RcFinder('.lesshintrc', {
            loader: loadConfig
        });

        config = rcfinder.find(path);
    }

    return config;
};
