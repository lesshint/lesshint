'use strict';

const parser = require('postcss-values-parser');
const util = require('util');

module.exports = {
    name: 'colorVariables',
    nodeTypes: ['decl'],
    message: '%s should be replaced with an existing variable.',

    lint: function colorVariablesLinter(config, node) {
        /**
         * Just in case, since postcss will sometimes include the semicolon
         * in declaration values
         */
        node.value = node.value.replace(/;$/, '');

        const ast = parser(node.value, {
            loose: true
        }).parse();

        // Parse the configuration for the style settings
        if (config.style) {
            throw new Error(`Invalid setting value for colorVariables: ${config.style}`);
        }

        const results = [];
        ast.first.walk(child => {
            if (child.type !== 'word' || !/^#/.test(child.value)) {
                return;
            }

            // If this is a variable assignment, allow hex colors
            const prop = node.prop;
            if (/@[a-zA-Z0-9-_]*/.test(prop)) {
                return;
            }

            // Detect hex color
            const color = child.value;
            if (/^#\d+$/.test(color)) {
                return;
            }

            // Hex color found, add to results
            results.push({
                column: node.source.start.column + node.prop.length + node.raws.between.length + (child.source.start.column - 1),
                message: util.format(this.message, color)
            });
        });

        if (results.length) {
            return results;
        }
        return null;
    }
};
