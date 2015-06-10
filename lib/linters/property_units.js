'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var errors = [];
    var property;
    var value;

    // Bail if the linter isn't wanted
    if (!config.propertyUnits || (config.propertyUnits && !config.propertyUnits.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (!node.is('declaration')) {
        return null;
    }

    property = node.first('property').first('ident').content;
    value = node.first('value');

    value.forEach('dimension', function (element) {
        var allowed = config.propertyUnits.properties[property];
        var unit = element.first('ident').content;

        // Check if the unit is allowed for this property
        if (Array.isArray(allowed) && allowed.indexOf(unit) !== -1) {
            return;
        }

        // Unit allowed, bail
        if (!allowed && config.propertyUnits.global.indexOf(unit) !== -1) {
            return;
        }

        errors.push({
            column: element.start.column,
            line: element.start.line,
            message: 'Unit "' + unit + '" is not allowed for "' + property + '".'
        });
    });

    // Check if percentages are allowed
    if (config.propertyUnits.global.indexOf('%') !== -1) {
        value.forEach('percentage', function (element) {
            // Check if the percentages are allowed for this property
            if (config.propertyUnits.properties[property]) {
                if (config.propertyUnits.properties[property].indexOf('%') !== -1) {
                    return;
                }
            }

            errors.push({
                column: element.start.column,
                line: element.start.line,
                message: 'Percentages are not allowed for "' + property + '".'
            });
        });
    }

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'propertyUnits',
                message: error.message
            };
        });
    }

    return null;
};
