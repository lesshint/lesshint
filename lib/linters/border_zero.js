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
        var content;
        var message;
        var value;

        property = node.first('property').first().content;

        // Not a border* property, bail
        if (properties.indexOf(property) === -1) {
            return null;
        }

        value = node.first('value');
        content = value.first().content;

        // Bail if it's an actual border
        if (content !== '0' && content !== 'none') {
            return null;
        }

        switch (config.style) {
            case 'none':
                if (content === '0') {
                    message = this.message.none;
                }

                break;
            case 'zero':
                if (content === 'none') {
                    message = this.message.zero;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for borderZero: ' + config.style
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
