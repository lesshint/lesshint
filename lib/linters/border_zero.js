'use strict';

module.exports = function (options) {
    var properties = ['border', 'border-bottom', 'border-left', 'border-right', 'border-top'];
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
    if (!node.is('declaration')) {
        return null;
    }

    property = node.first('property');

    // Not a border* property, bail
    if (properties.indexOf(property.first().content) === -1) {
        return null;
    }

    value = node.first('value');

    // Bail if it's an actual border
    if (value.first().content !== '0' && value.first().content !== 'none') {
        return null;
    }

    switch (config.borderZero.style) {
        case 'none':
            if (value.first().content === '0') {
                message = 'Border properties should use "none" instead of 0.';
            }

            break;
        case 'zero':
            if (value.first().content === 'none') {
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
            line: value.start.line,
            linter: 'borderZero',
            message: message
        };
    }

    return null;
};
