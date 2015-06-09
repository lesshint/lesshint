'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var regexp = /^(\d*\.\d*)0+$/;
    var config = options.config;
    var node = options.node;
    var message;
    var number;
    var value;

    // Bail if the linter isn't wanted
    if (!config.trailingZero || (config.trailingZero && !config.trailingZero.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    node.forEach('value', function (element) {
        value = element.first('dimension');
        value = value && value.first('number');
    });

    // No numbers found, bail
    if (!value) {
        return null;
    }

    number = value.content;

    switch (config.trailingZero.style) {
        case 'exclude_zero':
            if (regexp.test(number)) {
                message = number + ' should be written without trailing zeros.';
            }

            break;
        case 'include_zero':
            if (!regexp.test(number)) {
                message = number + ' should be written with trailing zeros.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for trailingZero: ' + config.trailingZero.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'trailingZero',
            message: message
        };
    }

    return null;
};
