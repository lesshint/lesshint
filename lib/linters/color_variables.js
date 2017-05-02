'use strict';

const util = require('util');
const parseValue = require('../utils/parse-value');
const isVariable = require('../utils/is-variable');

module.exports = {
    name: 'colorVariables',
    nodeTypes: ['decl'],
    message: '%s should be replaced with an existing variable.',

    lint: function colorVariablesLinter (config, node) {
        /**
         * Just in case, since postcss will sometimes include the semicolon
         * in declaration values
         */
        node.value = node.value.replace(/;$/, '');

        const ast = parseValue(node.value, {
            loose: true
        });

        const results = [];
        ast.first.walk((child) => {
            // Only evaluate hex colors
            if (child.type !== 'word' || !child.isColor) {
                return;
            }

            // If this is a variable assignment, allow hex colors
            const prop = node.prop;
            if (isVariable(prop)) {
                return;
            }
            const color = child.value;

            // Hex color found, add to results
            results.push({
                column: node.source.start.column + node.prop.length + node.raws.between.length + (child.source.start.column - 1),
                message: util.format(this.message, color)
            });
        });

        if (results.length) {
            return results;
        }
    }
};
