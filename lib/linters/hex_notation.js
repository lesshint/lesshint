'use strict';

module.exports = {
    name: 'hexNotation',
    nodeTypes: ['color'],
    message: '%s should be written in %s.',

    lint: function hexNotationLinter (config, node) {
        var color = '#' + node.content;
        var sprintf = require('sprintf-js').sprintf;
        var valid = true;

        if (/^#\d+$/.test(color)) {
            return null;
        }

        switch (config.style) {
            case 'lowercase':
                if (!/^#[0-9a-z]+$/.test(color)) {
                    valid = false;
                }

                break;
            case 'uppercase':
                if (!/^#[0-9A-Z]+$/.test(color)) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for hexNotation: ' + config.style
                );
        }

        if (!valid) {
            return [{
                message: sprintf(this.message, color, config.style)
            }];
        }
    }
};
