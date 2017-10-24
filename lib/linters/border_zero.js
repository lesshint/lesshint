'use strict';

module.exports = {
    name: 'borderZero',
    nodeTypes: ['decl'],
    message: {
        none: 'Border properties should use "none" instead of 0.',
        zero: 'Border properties should use 0 instead of "none".'
    },

    lint: function borderZeroLinter (config, node) {
        const properties = ['border', 'border-bottom', 'border-left', 'border-right', 'border-top'];

        // Not a border* property, bail
        if (properties.indexOf(node.prop) === -1) {
            return;
        }

        const value = node.value;

        // Bail if it's an actual border
        if (value !== '0' && value !== 'none') {
            return;
        }

        let message;

        switch (config.style) {
            case 'none':
                if (value === '0') {
                    message = this.message.none;
                }

                break;
            case 'zero':
                if (value === 'none') {
                    message = this.message.zero;
                }

                break;
            default:
                throw new Error(`Invalid setting value for borderZero: ${ config.style }`);
        }

        if (message) {
            const position = node.positionBy({
                word: value
            });

            return [{
                column: position.column,
                line: position.line,
                message: message
            }];
        }
    }
};
