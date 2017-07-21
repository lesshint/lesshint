'use strict';

const isVariable = require('../utils/is-variable');
const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'propertyUnits',
    nodeTypes: ['decl'],
    message: {
        unit: 'Unit "%s" is not allowed for "%s".'
    },

    lint: function propertyUnitsLinter (config, node) {
        const property = node.prop;

        if (isVariable(property)) {
            return;
        }

        // Sanity checks
        config.valid = Array.isArray(config.valid) ? config.valid : [];
        config.invalid = Array.isArray(config.invalid) ? config.invalid : [];
        config.properties = config.properties || {};

        const allowed = config.properties[property];
        const ast = parseValue(node.value);
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

            const position = node.positionBy({
                word: node.value
            });

            results.push({
                column: position.column,
                line: position.line,
                message: util.format(this.message.unit, unit, property)
            });
        });

        if (results.length) {
            return results;
        }
    }
};
