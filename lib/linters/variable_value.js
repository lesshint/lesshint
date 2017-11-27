'use strict';

const isVariable = require('../utils/is-variable');
const util = require('util');

module.exports = {
    name: 'variableValue',
    nodeTypes: ['decl'],
    message: '%s is not allowed in "%s" property.',

    lint: function variableValueLinter (config, node) {
        if (config.allowedValues &&
            config.allowedValues.indexOf(node.value) !== -1) {
            return;
        }

        if (config.never && config.never.indexOf(node.prop) !== -1) {
            if (isVariable(node.value)) {
                const position = node.positionBy({
                    word: node.value
                });

                return [{
                    column: position.column,
                    line: position.line,
                    message: util.format(this.message, 'Variable', node.prop)
                }];
            }
        }

        if (config.always && config.always.indexOf(node.prop) !== -1) {
            if (!isVariable(node.value)) {
                const position = node.positionBy({
                    word: node.value
                });

                return [{
                    column: position.column,
                    line: position.line,
                    message: util.format(this.message, 'Non variable', node.prop)
                }];
            }
        }
    }
};
