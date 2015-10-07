'use strict';

module.exports = {
    name: 'propertyUnits',
    nodeTypes: ['declaration'],
    message: {
        percentage: 'Percentages are not allowed for "%s".',
        unit: 'Unit "%s" is not allowed for "%s".'
    },

    lint: function propertyUnitsLinter (config, node) {
        var results = [];
        var property;
        var value;
        var sprintf = require('sprintf-js').sprintf;
        var self = this;

        property = node.first('property').first('ident').content;
        value = node.first('value');

        // sanity checking
        config.valid = Array.isArray(config.valid) ? config.valid : [];
        config.invalid = Array.isArray(config.invalid) ? config.invalid : [];
        config.properties = config.properties || {};

        value.forEach('dimension', function (element) {
            var allowed = config.properties[property];
            var unit = element.first('ident').content;

            // if this unit is marked invalid, then the other checks are moot
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
                column: element.start.column,
                line: element.start.line,
                message: sprintf(self.message.unit, unit, property)
            });
        });

        // Check if percentages are allowed
        if (config.valid.indexOf('%') === -1) {
            value.forEach('percentage', function (element) {

                if (config.invalid.indexOf('%') === -1) {
                    // Check if the percentages are allowed for this property
                    if (config.properties[property]) {
                        if (config.properties[property].indexOf('%') !== -1) {
                            return;
                        }
                    }
                }

                results.push({
                    column: element.start.column,
                    line: element.start.line,
                    message: sprintf(self.message.percentage, property)
                });
            });
        }

        if (results.length) {
            return results;
        }
    }
};
