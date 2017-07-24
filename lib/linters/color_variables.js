'use strict';

const util = require('util');
const parseValue = require('../utils/parse-value');
const isVariable = require('../utils/is-variable');

module.exports = {
    name: 'colorVariables',
    nodeTypes: ['decl'],
    message: '%s should be replaced with an existing variable.',

    lint: function colorVariablesLinter (config, node) {
        const ast = parseValue(node.value);
        const results = [];

        ast.first.walk((child) => {
            // Only evaluate hex colors
            if (child.type !== 'word' || !child.isColor) {
                return;
            }

            // If it's a variable assignment, allow hex colors
            if (isVariable(node.prop)) {
                return;
            }

            const color = child.value;
            const position = node.positionBy({
                word: color
            });

            results.push({
                column: position.column,
                line: position.line,
                message: util.format(this.message, color)
            });
        });

        if (results.length) {
            return results;
        }
    }
};
