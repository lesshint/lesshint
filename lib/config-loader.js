'use strict';

const stripJsonComments = require('strip-json-comments');
const cosmiconfig = require('cosmiconfig');
const fs = require('fs');

const loader = (filepath, content) => {
    content = stripJsonComments(content);

    // Strip BOM
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }

    return Object.assign(JSON.parse(content), {
        configPath: filepath,
    });
};

module.exports = (path = process.cwd()) => {
    const stats = fs.statSync(path);
    const explorer = cosmiconfig('lesshint', {
        loaders: {
            '.json': loader,
            noExt: loader,
        },
        searchPlaces: [
            '.lesshintrc.js',
            '.lesshintrc.json',
            '.lesshintrc.yaml',
            '.lesshintrc.yml',
            '.lesshintrc',
            'package.json',
        ]
    });

    let result;

    if (stats.isFile()) {
        // A file was passed, try to load it
        result = explorer.loadSync(path);
    } else {
        // Try to find a config file instead
        result = explorer.searchSync(path);
    }

    return result ? result.config : null;
};
