'use strict';

const stripJsonComments = require('strip-json-comments');
const RcFinder = require('rcfinder');
const fs = require('fs');

const loadConfig = (path) => {
    let data = fs.readFileSync(path, 'utf8');

    data = stripJsonComments(data);

    // Strip BOM
    if (data.charCodeAt(0) === 0xFEFF) {
        data = data.slice(1);
    }

    return Object.assign(JSON.parse(data), {
        configPath: path
    });
};

module.exports = (path = process.cwd()) => {
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
