'use strict';

var util = require('util');

var isValidTrailing = function (number) {
    var regexp = /^-?([^0]\d*)?\.(\d*0)$/;

    return regexp.test(number);
};

var isValidLeading = function (number) {
    var regexp = /^-?(0|\d+)\.(\d*[^0])$/;

    return regexp.test(number);
};

var isValidBoth = function (number) {
    var regexp = /^-?(0|\d+)\.(\d*0)$/;

    return regexp.test(number);
};

var isValidNone = function (number) {
    var regexp = /^-?([^0]\d*)?\.(\d*[^0])$/;

    return regexp.test(number);
};

module.exports = {
    name: 'decimalZero',
    nodeTypes: ['declaration'],
    message: '%s should be written %s %s zero.',

    lint: function decimalZeroLinter (config, node) {
        var number;
        var value;
        var output = {
            inclusion: 'with',
            type: null
        };

        node.forEach('value', function (element) {
            value = element.first('dimension');
            value = value && value.first('number');
        });

        // Bail if NOT floating point format or no value
        if (!value || !(/^-?(\d*\.\d*)/.test(value.content))) {
            return;
        }

        number = value.content;

        switch (config.style) {
            case 'leading':
                if (!isValidLeading(number)) {
                    output.type = 'leading';
                }
                break;
            case 'trailing':
                if (!isValidTrailing(number)) {
                    output.type = 'trailing';
                }
                break;
            case 'both':
                if (!isValidBoth(number)) {
                    output.type = 'leading and trailing';
                }
                break;
            case 'none':
                if (!isValidNone(number)) {
                    output.type = 'leading and trailing';
                    output.inclusion = 'without';
                }
                break;
            default:
                throw new Error(
                    'Invalid setting value for decimalZero: ' + config.style
                );
        }

        if (output.type) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: util.format(this.message, number, output.inclusion, output.type)
            }];
        }
    }
};
