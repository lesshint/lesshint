'use strict';

module.exports = {

    name: 'borderZero',
    nodeTypes: ['declaration'],
    message: {
        none: 'Border properties should use "none" instead of 0.',
        zero: 'Border properties should use 0 instead of "none".'
    },

    lint: function borderZeroLinter (config, node) {

        var properties = ['border', 'border-bottom', 'border-left', 'border-right', 'border-top'];
        var property;
        var message;
        var value;

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
                    message = this.message.none;
                }

                break;
            case 'zero':
                if (value.first().content === 'none') {
                    message = this.message.zero;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for borderZero: ' + config.borderZero.style
                );
        }

        if (message) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: message
            }];
        }
    }
};
