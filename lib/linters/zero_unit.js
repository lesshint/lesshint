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
        var excludedProperties = ['opacity', 'z-index'];
        var excludedUnits = [];
        var property = node.first('property').first('ident');

        if (config) {
            if (config.exclude && config.exclude.length) {
                excludedProperties = excludedProperties.concat(config.exclude);
            }

            if (config.units && config.units.length) {
                excludedUnits = excludedUnits.concat(config.units);
            }
        }

        // No property, or it shouldn't be checked for units
        if (!property || (property.content && excludedProperties.indexOf(property.content) !== -1)) {
            return;
        }

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
            return;
        }

        // Unit is excluded, nothing to do
        if (unit && excludedUnits.indexOf(unit.content) > -1) {
            return;
        }

        // Unit is always required by the CSS spec, nothing to do
        if (unit && units.indexOf(unit.content) === -1) {
            return;
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
                throw new Error('Invalid setting value for zeroUnit: ' + config.style);
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
