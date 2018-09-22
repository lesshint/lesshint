'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'propertyUnits',
    nodeTypes: ['decl'],
    message: {
        unit: 'Unit "%s" is not allowed for "%s".'
    },

    lint: function propertyUnitsLinter (config, node) {
        // Sanity checks
        config.valid = Array.isArray(config.valid) ? config.valid : [];
        config.invalid = Array.isArray(config.invalid) ? config.invalid : [];
        config.properties = config.properties || {};

        const property = node.prop;
        const allowed = config.properties[property];
        const ast = parseValue(node.value);
        const results = [];

        ast.first.walk((value) => {
            if (value.type !== 'number' || !value.unit) {
                return;
            }

            const { unit } = value;

            // If this unit is marked invalid, then the other checks are moot
            if (!config.invalid.includes(unit)) {
                // Check if the unit is allowed for this property
                if (Array.isArray(allowed) && allowed.includes(unit)) {
                    return;
                }

                // Unit allowed, bail
                if (!allowed && config.valid.includes(unit)) {
                    return;
                }
            }

            const { column, line } = node.positionBy({
                word: node.value
            });

            results.push({
                column,
                line,
                message: util.format(this.message.unit, unit, property)
            });
        });

        if (results.length) {
            return results;
        }
    }
};
