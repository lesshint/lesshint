'use strict';

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

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var message;
    var number;
    var value;

    // Bail if the linter isn't wanted
    if (!config.decimalZero || (config.decimalZero && !config.decimalZero.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    node.forEach('value', function (element) {
        value = element.first('dimension');
        value = value && value.first('number');
    });

    // Bail if NOT floating point format or no value
    if (!value || !(/^-?(\d*\.\d*)/.test(value.content))) {
        return null;
    }

    number = value.content;

    switch (config.decimalZero.style) {
        case 'leading':
            if (!isValidLeading(number)) {
                message = number + ' should be written with leading zero.';
            }
            break;
        case 'trailing':
            if (!isValidTrailing(number)) {
                message = number + ' should be written with trailing zero.';
            }
            break;
        case 'both':
            if (!isValidBoth(number)) {
                message = number + ' should be written with leading and trailing zero.';
            }
            break;
        case 'none':
            if (!isValidNone(number)) {
                message = number + ' should be written without leading and trailing zero.';
            }
            break;
        default:
            throw new Error(
                'Invalid setting value for decimalZero: ' + config.decimalZero.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            line: value.start.line,
            linter: 'decimalZero',
            message: message
        };
    }

    return null;
};
