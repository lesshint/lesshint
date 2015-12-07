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
        if (config.style !== 'alpha') {
            throw new Error(
                'Invalid setting value for propertyOrdering: ' + config.style
            );
        }

        node.forEach('declaration', function (declaration) {
            var currentProperty;
            var property;

            if (results) {
                return;
            }

            property = declaration.first('property').first('ident');
            if (!property) {
                return;
            }

            currentProperty = property.content.toLowerCase();

            // Check for proper ordering
            if (previousProp && previousProp.localeCompare(currentProperty) > 0) {
                results = [{
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
