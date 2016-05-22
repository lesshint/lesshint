'use strict';

module.exports = {
    name: 'propertyOrdering',
    nodeTypes: ['rule'],
    message: 'Property ordering is not alphabetized',

    lint: function propertyOrderingLinter (config, node) {
        var previousProp = null;
        var results = [];
        var self = this;

        // Only support alpha for now
        if (config.style !== 'alpha') {
            throw new Error('Invalid setting value for propertyOrdering: ' + config.style);
        }

        node.each(function (child) {
            var currentProperty;
            var property;

            if (child.type !== 'decl' || results.length) {
                return;
            }

            property = child.prop;

            // Ignore declarations without a property and variables
            if (!property || (property && /^@/.test(property))) {
                return;
            }

            currentProperty = property.toLowerCase();

            // Check for proper ordering
            if (previousProp && previousProp.localeCompare(currentProperty) > 0) {
                results = [{
                    column: child.source.start.column,
                    line: child.source.start.line,
                    message: self.message
                }];
            }

            previousProp = currentProperty;

        });

        if (results.length) {
            return results;
        }
    }
};
