'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'zeroUnit',
    nodeTypes: ['decl'],
    message: 'Unit should %sbe omitted on zero values.',

    lint: function zeroUnitLinter (config, node) {
        // Units to check for
        const units = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc', 'px'];
        let excludedProperties = ['opacity', 'z-index', 'flex-shrink', 'flex-grow'];
        let excludedUnits = [];

        if (config) {
            if (config.exclude && config.exclude.length) {
                excludedProperties = excludedProperties.concat(config.exclude);
            }

            if (config.units && config.units.length) {
                excludedUnits = excludedUnits.concat(config.units);
            }
        }

        // This property shouldn't be checked for units
        if (excludedProperties.includes(node.prop)) {
            return;
        }

        const ast = parseValue(node.value);
        const results = [];

        ast.first.each((child) => {
            const { unit } = child;
            let valid = true;

            if (child.type !== 'number' || child.value !== '0') {
                return;
            }

            // Unit is excluded, nothing to do
            if (excludedUnits.includes(unit)) {
                return;
            }

            // Unit is always required by the CSS spec, nothing to do
            if (unit && !units.includes(unit)) {
                return;
            }

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
                    throw new Error(`Invalid setting value for zeroUnit: ${ config.style }`);
            }

            if (!valid) {
                const { column, line } = node.positionBy({
                    word: node.value
                });

                results.push({
                    column,
                    line,
                    message: util.format(this.message, config.style === 'keep_unit' ? 'not ' : '')
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
