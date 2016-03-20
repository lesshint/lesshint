'use strict';

module.exports = {
    name: 'borderZero',
    nodeTypes: ['decl'],
    message: {
        none: 'Border properties should use "none" instead of 0.',
        zero: 'Border properties should use 0 instead of "none".'
    },

    lint: function borderZeroLinter (config, node) {
        var properties = ['border', 'border-bottom', 'border-left', 'border-right', 'border-top'];
        var message;

        // Not a border* property, bail
        if (properties.indexOf(node.prop) === -1) {
            return;
        }

        // Bail if it's an actual border
        if (node.value !== '0' && node.value !== 'none') {
            return;
        }

        switch (config.style) {
            case 'none':
                if (node.value === '0') {
                    message = this.message.none;
                }

                break;
            case 'zero':
                if (node.value === 'none') {
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
                column: node.source.start.column + node.prop.length + node.raws.between.length,
                line: node.source.start.line,
                message: message
            }];
        }
    }
};
