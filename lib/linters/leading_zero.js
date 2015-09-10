'use strict';

module.exports = {

    name: 'leadingZero',
    nodeTypes: ['declaration'],
    message: '%s should be written %s a leading zero.',

    lint: function leadingZeroLinter (config, node) {
        var regexp = /^-?(0\.\d+)/;
        var number;
        var value;
        var valid = true;
        var sprintf = require('sprintf-js').sprintf;
        var style = config.leadingZero.style;

        node.forEach('value', function (element) {
            value = element.first('dimension');
            value = value && value.first('number');
        });

        // No numbers to check found, bail
        if (!value || !(/^-?(0?\.\d+)/.test(value.content))) {
            return null;
        }

        number = value.content;

        switch (style) {
            case 'exclude_zero':
                if (regexp.test(number)) {
                    valid = false;
                }

                break;
            case 'include_zero':
                if (!regexp.test(number)) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for leadingZero: ' + config.leadingZero.style
                );
        }

        if (!valid) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: sprintf(this.message, number.toString(), style === 'exclude_zero' ? 'without' : 'with')
            }];
        }
    }
};
