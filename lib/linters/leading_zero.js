'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var regexp = /^-?(0\.\d+)/;
    var config = options.config;
    var node = options.node;
    var message;
    var number;
    var value;

    // Bail if the linter isn't wanted
    if (!config.leadingZero || (config.leadingZero && !config.leadingZero.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    node.content.forEach(function (element) {
        if (element.type !== 'value') {
            return;
        }

        value = element.first('dimension');
        value = value && value.first('number');
    });

    // No numbers to check found, bail
    if (!value || !(/^-?(0?\.\d+)/.test(value.content))) {
        return null;
    }

    number = value.content;

    switch (config.leadingZero.style) {
        case 'exclude_zero':
            if (regexp.test(number)) {
                message = number + ' should be written without a leading zero.';
            }

            break;
        case 'include_zero':
            if (!regexp.test(number)) {
                message = number + ' should be written with a leading zero.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for leadingZero: ' + config.leadingZero.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'leadingZero',
            message: message
        };
    }

    return null;
};
