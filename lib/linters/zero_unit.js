'use strict';

module.exports = function (options) {
    var units = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc', 'px']; // Units to check for
    var config = options.config;
    var node = options.node;
    var message;
    var number;
    var value;
    var unit;

    // Bail if the linter isn't wanted
    if (!config.zeroUnit || (config.zeroUnit && !config.zeroUnit.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
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
        return null;
    }

    // Unit is required, nothing to do
    if (unit && units.indexOf(unit.content) === -1) {
        return null;
    }

    number = number.content;

    switch (config.zeroUnit.style) {
        case 'keep_unit':
            if (!unit) {
                message = 'Unit should not be omitted on zero values.';
            }

            break;
        case 'no_unit':
            if (unit) {
                message = 'Unit should be omitted on zero values.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for zeroUnit: ' + config.zeroUnit.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            line: value.start.line,
            linter: 'zeroUnit',
            message: message
        };
    }

    return null;
};
