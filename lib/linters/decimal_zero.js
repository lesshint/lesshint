'use strict';

var util = require('util');

module.exports = {
    name: 'decimalZero',
    nodeTypes: ['declaration'],
    message: '%s should be written %s %s zero.',

    lint: function decimalZeroLinter (config, node) {
        var number;
        var result = [];
        var self = this;

        node.traverseByType('number', function (element) {
            var output;

            number = element.content;

            /*
             * Bail if:
             *  - Not a floating point number
             *  - Float parsed as 0 (e.g. 0.0, .0, 0.)
             */
            if (!(/^-?(\d*\.\d*)/.test(number)) || parseFloat(number) === 0) {
                return;
            }

            output = {
                inclusion: 'with',
                type: null
            };

            switch (config.style) {
                case 'leading':
                    if (!/^-?(\d+)\.(\d*[1-9])$/.test(number)) {
                        output.type = 'leading';
                    }
                    break;
                case 'trailing':
                    if (!/^-?([1-9]\d*)?\.(\d*0)$/.test(number)) {
                        output.type = 'trailing';
                    }
                    break;
                case 'both':
                    if (!/^-?(\d+)\.(\d*0)$/.test(number)) {
                        output.type = 'leading and trailing';
                    }
                    break;
                case 'none':
                    if (!/^-?([1-9]\d*)?\.(\d*[1-9])$/.test(number)) {
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
                result.push({
                    column: element.start.column,
                    line: element.start.line,
                    message: util.format(self.message, number, output.inclusion, output.type)
                });
            }
        });//traverseByType('number')

        if (result.length > 0) {
            return result;
        }
    }
};
