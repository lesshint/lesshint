'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
    var color;
    var value;

    // Bail if the linter isn't wanted
    if (config.hexNotation && !config.hexNotation.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    node.forEach('value', function (element) {
        value = element.first('color');
    });

    // No colors found, bail
    if (!value) {
        return null;
    }

    color = '#' + value.content;

    switch (config.hexNotation.style) {
        case 'lowercase':
            if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(color)) {
                message = 'Hexadecimal colors should be written in lowercase.';
            }

            break;
        case 'uppercase':
            if (!/^#([0-9A-F]{3}|[0-9A-F]{6})$/.test(color)) {
                message = 'Hexadecimal colors should be written in uppercase.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for hexNotation: ' + config.hexNotation.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'hexNotation',
            message: message
        };
    }

    return true;
};
