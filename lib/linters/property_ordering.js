'use strict';

module.exports = {

    name: 'propertyOrdering',
    nodeTypes: ['block'],
    message: 'Property ordering is not alphabetized',

    lint: function propertyOrderingLinter (config, node) {
        var previousProp = null;
        var results = null;
        var self = this;

        // Only support alpha for now
        if (config.propertyOrdering.style !== 'alpha') {
            throw new Error(
                'Invalid setting value for propertyOrdering: ' + config.propertyOrdering.style
            );
        }

        node.forEach('declaration', function (declaration) {
            if (results) {
                return;
            }

            var property = declaration.first('property').content[0];
            var currentProperty = property.content.toLowerCase();

            // Check for proper ordering
            if (previousProp && previousProp.localeCompare(currentProperty) > 0) {
                results =  [{
                    column: property.start.column,
                    line: property.start.line,
                    message: self.message
                }];
            }

            previousProp = currentProperty;
        });

        return results;
    }
};
