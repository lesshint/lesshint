'use strict';

const isVariable = require('../utils/is-variable');
const util = require('util');

module.exports = {
    name: 'variableValue',
    nodeTypes: ['decl'],
    message: '%s is not allowed in "%s" property.',

    lint: function variableValueLinter (config, node) {
        if (config.allowedValues && config.allowedValues.includes(node.value)) {
            return;
        }

        if (config.never && config.never.includes(node.prop)) {
            if (isVariable(node.value)) {
                const { column, line } = node.positionBy({
                    word: node.value
                });

                return [{
                    column,
                    line,
                    message: util.format(this.message, 'Variable', node.prop)
                }];
            }
        }

        if (config.always && config.always.includes(node.prop)) {
            if (!isVariable(node.value)) {
                const { column, line } = node.positionBy({
                    word: node.value
                });

                return [{
                    column,
                    line,
                    message: util.format(this.message, 'Non variable', node.prop)
                }];
            }
        }
    }
};
