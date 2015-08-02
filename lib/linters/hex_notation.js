'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var message;
    var color;

    // Bail if the linter isn't wanted
    if (!config.hexNotation || (config.hexNotation && !config.hexNotation.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'color') {
        return null;
    }

    color = '#' + node.content;
    if (/^#\d+$/.test(color)) {
        return null;
    }

    switch (config.hexNotation.style) {
        case 'lowercase':
            if (!/^#[0-9a-z]+$/.test(color)) {
                message = color + ' should be written in lowercase.';
            }

            break;
        case 'uppercase':
            if (!/^#[0-9A-Z]+$/.test(color)) {
                message = color + ' should be written in uppercase.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for hexNotation: ' + config.hexNotation.style
            );
    }

    if (message) {
        return {
            column: node.start.column,
            line: node.start.line,
            linter: 'hexNotation',
            message: message
        };
    }

    return null;
};
