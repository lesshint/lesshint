'use strict';

var parser = require('postcss-values-parser');
var util = require('util');

module.exports = {
    name: 'zeroUnit',
    nodeTypes: ['decl'],
    message: 'Unit should %sbe omitted on zero values.',

    lint: function zeroUnitLinter (config, node) {
        // Units to check for
        var units = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc', 'px'];
        var excludedProperties = ['opacity', 'z-index'];
        var excludedUnits = [];
        var results = [];
        var self = this;
        var ast;

        if (config) {
            if (config.exclude && config.exclude.length) {
                excludedProperties = excludedProperties.concat(config.exclude);
            }

            if (config.units && config.units.length) {
                excludedUnits = excludedUnits.concat(config.units);
            }
        }

        // This property shouldn't be checked for units
        if (excludedProperties.indexOf(node.prop) !== -1) {
            return;
        }

        ast = parser(node.value).parse();

        ast.first.each(function (child) {
            var unit = child.unit;
            var valid = true;

            if (child.type !== 'number' || child.value !== '0') {
                return;
            }

            // Unit is excluded, nothing to do
            if (excludedUnits.indexOf(unit) !== -1) {
                return;
            }

            // Unit is always required by the CSS spec, nothing to do
            if (unit && units.indexOf(unit) === -1) {
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
                    throw new Error('Invalid setting value for zeroUnit: ' + config.style);
            }

            if (!valid) {
                results.push({
                    column: node.source.start.column + node.prop.length + node.raws.between.length + child.source.start.column - 1,
                    line: node.source.start.line,
                    message: util.format(self.message, config.style === 'keep_unit' ? 'not ' : '')
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
