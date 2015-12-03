'use strict';

var util = require('util');

module.exports = {
    name: 'zeroUnit',
    nodeTypes: ['declaration'],
    message: 'Unit should %sbe omitted on zero values.',

    lint: function zeroUnitLinter (config, node) {
        // Units to check for
        var units = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc', 'px'];
        var valid = true;
        var number;
        var value;
        var unit;

        node.forEach('value', function (element) {
            value = element.first('dimension');

            if (value) {
                number = value.first('number');
                unit = value.first('ident');
            } else {
                value = element.first('number'); // For use in errors

                number = value;
            }
        });

        // Nothing to lint found, bail
        if (!number || parseFloat(number.content) !== 0) {
            return null;
        }

        // Unit is required, nothing to do
        if (unit && units.indexOf(unit.content) === -1) {
            return null;
        }

        number = number.content;

        switch (config.style) {
            case 'keep_unit':
                if (!unit) {
                    valid = false;
                }

                break;
            case 'no_unit':
                if (unit) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for zeroUnit: ' + config.style
                );
        }

        if (!valid) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: util.format(this.message, config.style === 'keep_unit' ? 'not ' : '')
            }];
        }
    }
};
