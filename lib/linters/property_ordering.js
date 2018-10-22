'use strict';

const isVariable = require('../utils/is-variable');

module.exports = {
    name: 'propertyOrdering',
    nodeTypes: ['atrule', 'rule'],
    message: 'Property ordering is not alphabetized',

    lint: function propertyOrderingLinter (config, node) {
        let ordering;

        try {
            ordering = require('../config/ordering/' + config.style);
        } catch (excep) {
            throw new Error(`Invalid setting value for propertyOrdering: ${ config.style }`);
        }

        if (config.style !== 'alpha') {
            this.message = 'Property ordering is not ' + config.style;
        }

        let previousProp = null;
        let previousPos = 0;
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
            let currentPosition = ordering.indexOf(currentProperty);
            let report = false;

            // Check for proper ordering
            if (currentPosition !== -1) {
                report = previousPos > currentPosition;
            } else {
                currentPosition = 999; // Try to force the end of known declarations

                if (previousProp && previousProp.localeCompare(currentProperty) > 0) {
                    report = true;
                }
            }

            if (report) {
                results.push({
                    column: child.source.start.column,
                    line: child.source.start.line,
                    message: this.message
                });
            }

            previousPos = currentPosition;
            previousProp = currentProperty;
        });

        if (results.length) {
            return results;
        }
    }
};
