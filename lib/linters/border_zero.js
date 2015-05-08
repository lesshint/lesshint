'use strict';

var path = require('path');

module.exports = function (options) {
    var properties = ['border', 'border-bottom', 'border-left', 'border-right', 'border-top'];
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var property;
    var message;
    var value;

    // Bail if the linter isn't wanted
    if (!config.borderZero || (config.borderZero && !config.borderZero.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    property = node.first('property');

    // Not a border* property, bail
    if (properties.indexOf(property.content[0].content) === -1) {
        return null;
    }

    value = node.first('value');

    // Bail if it's an actual border
    if ((value.content[0].content !== '0' && value.content[0].content !== 'none')) {
        return null;
    }

    switch (config.borderZero.style) {
        case 'none':
            if (value.content[0].content === '0') {
                message = 'Border properties should use "none" instead of 0.';
            }

            break;
        case 'zero':
            if (value.content[0].content === 'none') {
                message = 'Border properties should use 0 instead of "none".';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for borderZero: ' + config.borderZero.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'borderZero',
            message: message
        };
    }

    return true;
};
