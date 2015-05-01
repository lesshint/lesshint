'use strict';

var path = require('path');

var canShorten = function (color) {
    return color[1] === color[2] && color[3] === color[4] && color[5] === color[6];
};

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
    var color;
    var value;

    // Bail if the linter isn't wanted
    if (config.hexLength && !config.hexLength.enabled) {
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

    switch (config.hexLength.style) {
        case 'long':
            if (!/^#[0-9a-f]{6}$/i.test(color)) {
                message = color + ' should be written in the long-form format.';
            }

            break;
        case 'short':
            // We want to allow longhand form on hex values that can't be shortened
            if (!/^#[0-9a-f]{3}$/i.test(color) && canShorten(color)) {
                message = color + ' should be written in the short-form format.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for hexLength: ' + config.hexLength.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'hexLength',
            message: message
        };
    }

    return true;
};
