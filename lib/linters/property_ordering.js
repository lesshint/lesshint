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

        node.walkDecls(function (declaration) {
            var currentProperty;
            var property;

            if (results.length) {
                return;
            }

            property = declaration.prop;

            if (!property) {
                return;
            }

            currentProperty = property.toLowerCase();

            // Check for proper ordering
            if (previousProp && previousProp.localeCompare(currentProperty) > 0) {
                results = [{
                    column: declaration.source.start.column,
                    line: declaration.source.start.line,
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
