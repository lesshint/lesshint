'use strict';

const parser = require('postcss-values-parser');
const util = require('util');

module.exports = {
    name: 'propertyUnits',
    nodeTypes: ['decl'],
    message: {
        unit: 'Unit "%s" is not allowed for "%s".'
    },

    lint: function propertyUnitsLinter (config, node) {
        const property = node.prop;

        // Ignore variables
        if (property.substring(0, 1) === '@') {
            return;
        }

        // Sanity checks
        config.valid = Array.isArray(config.valid) ? config.valid : [];
        config.invalid = Array.isArray(config.invalid) ? config.invalid : [];
        config.properties = config.properties || {};

        const allowed = config.properties[property];
        const ast = parser(node.value, {
            loose: true
        }).parse();

        const results = [];

        ast.first.walk((value) => {
            if (value.type !== 'number' || !value.unit) {
                return;
            }

            const unit = value.unit;

            // If this unit is marked invalid, then the other checks are moot
            if (config.invalid.indexOf(unit) === -1) {
                // Check if the unit is allowed for this property
                if (Array.isArray(allowed) && allowed.indexOf(unit) !== -1) {
                    return;
                }

                // Unit allowed, bail
                if (!allowed && config.valid.indexOf(unit) !== -1) {
                    return;
                }
            }

            results.push({
                column: node.source.start.column + node.raws.between.length + property.length + value.source.start.column - 1,
                line: value.source.start.line,
                message: util.format(this.message.unit, unit, property)
            });
        });

        if (results.length) {
            return results;
        }
    }
};
