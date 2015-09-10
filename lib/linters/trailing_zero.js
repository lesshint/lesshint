'use strict';

module.exports = {

    name: 'trailingZero',
    nodeTypes: ['declaration'],
    message: '%s should be written %s trailing zeros.',

    lint: function trailingZeroLinter (config, node) {

        var regexp = /^(\d*\.\d*)0+$/;
        var number;
        var value;
        var valid = true;
        var sprintf = require('sprintf-js').sprintf;

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
            case 'without':
                if (regexp.test(number)) {
                    valid = false;
                }

                break;
            case 'with':
                if (!regexp.test(number)) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for trailingZero: ' + config.trailingZero.style
                );
        }

        if (!valid) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: sprintf(this.message, number.toString(), config.trailingZero.style)
            }];
        }
    }
};
