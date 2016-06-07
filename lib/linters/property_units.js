'use strict';

var parser = require('postcss-values-parser');
var util = require('util');

module.exports = {
    name: 'propertyUnits',
    nodeTypes: ['decl'],
    message: {
        unit: 'Unit "%s" is not allowed for "%s".'
    },

    lint: function propertyUnitsLinter (config, node) {
        var property = node.prop;
        var results = [];
        var self = this;
        var ast;

        // Ignore variables
        if (property.substring(0, 1) === '@') {
            return;
        }

        // Sanity checks
        config.valid = Array.isArray(config.valid) ? config.valid : [];
        config.invalid = Array.isArray(config.invalid) ? config.invalid : [];
        config.properties = config.properties || {};

        ast = parser(node.value).parse();
        ast.first.walk(function (value) {
            var allowed = config.properties[property];
            var unit;

            if (value.type !== 'number' || !value.unit) {
                return;
            }

            unit = value.unit;

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
                message: util.format(self.message.unit, unit, property)
            });
        });

        if (results.length) {
            return results;
        }
    }
};
