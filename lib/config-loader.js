'use strict';

const stripJsonComments = require('strip-json-comments');
const RcFinder = require('rcfinder');
const fs = require('fs');

const loadConfig = function (path) {
    let data = fs.readFileSync(path, 'utf8');

    data = stripJsonComments(data);

    // Strip BOM
    if (data.charCodeAt(0) === 0xFEFF) {
        data = data.slice(1);
    }

    data = JSON.parse(data);
    data.configPath = path;
    return data;
};

module.exports = function (path) {
    path = path || process.cwd();

    const stats = fs.statSync(path);
    let config;

    if (stats.isFile()) {
        // A file was passed, try to load it
        config = loadConfig(path);
    } else {
        // Try to find a config file instead
        const rcfinder = new RcFinder('.lesshintrc', {
            loader: loadConfig
        });

        config = rcfinder.find(path);
    }

    return config;
};
