'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var errors = [];

    // Bail if the linter isn't wanted
    if (!config.stringQuotes || (config.stringQuotes && !config.stringQuotes.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'stylesheet') {
        return null;
    }

    node.map(function (element) {
        if (element.type !== 'string') {
            return;
        }

        switch (config.stringQuotes.style) {
            case 'double':
                if (!/".*"/.test(element.content)) {
                    errors.push({
                        message: 'Strings should use double quotes.',
                        column: element.start.column,
                        line: element.start.line
                    });
                }

                break;
            case 'single':
                if (!/'.*'/.test(element.content)) {
                    errors.push({
                        message: 'Strings should use single quotes.',
                        column: element.start.column,
                        line: element.start.line
                    });
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for stringQuotes: ' + config.stringQuotes.style
                );
        }
    });

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'stringQuotes',
                message: error.message
            };
        });
    }

    return null;
};
