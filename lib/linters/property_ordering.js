'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var previousProp = null;
    var results = null;

    // Bail if the linter isn't wanted
    if (!config.propertyOrdering || (config.propertyOrdering && !config.propertyOrdering.enabled)) {
        return null;
    }

    // Only support alpha for now
    if (config.propertyOrdering.style !== 'alpha') {
        throw new Error(
            'Invalid setting value for propertyOrdering: ' + config.propertyOrdering.style
        );
    }

    // Not applicable, bail
    if (node.type !== 'block') {
        return null;
    }

    node.forEach('declaration', function (declaration) {
        if (results) { return; }

        var property = declaration.first('property').content[0];
        var currentProperty = property.content.toLowerCase();

        // Check for proper ordering
        if (previousProp && previousProp.localeCompare(currentProperty) > -1) {
            results =  {
                column: property.start.column,
                line: property.start.line,
                linter: 'propertyOrdering',
                message: 'Property ordering is not alphabetized'
            };
        }

        previousProp = currentProperty;
    });

    return results;
};
