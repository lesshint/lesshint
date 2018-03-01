'use strict';

const isVariable = require('../utils/is-variable');

module.exports = {
    name: 'propertyOrdering',
    nodeTypes: ['atrule', 'rule'],
    message: 'Property ordering is not alphabetized',

    lint: function propertyOrderingLinter (config, node) {
        // Only support alpha for now
        if (config.style !== 'alpha') {
            throw new Error(`Invalid setting value for propertyOrdering: ${ config.style }`);
        }

        let previousProp = null;
        const results = [];

        node.each((child) => {
            if (child.type !== 'decl' || results.length) {
                return;
            }

            const property = child.prop;

            // Ignore declarations without a property and variables
            if (!property || isVariable(property)) {
                return;
            }

            const currentProperty = property.toLowerCase();

            // Check for proper ordering
            if (previousProp && previousProp.localeCompare(currentProperty) > 0) {
                results.push({
                    column: child.source.start.column,
                    line: child.source.start.line,
                    message: this.message
                });
            }

            previousProp = currentProperty;
        });

        if (results.length) {
            return results;
        }
    }
};
