'use strict';

const isVariable = require('../utils/is-variable');
const util = require('util');

module.exports = {
    name: 'variableValue',
    nodeTypes: ['decl'],
    message: '%s is not allowed in "%s" property.',

    lint: function variableValueLinter (config, node) {
        const { value } = node;

        if (config.allowedValues && config.allowedValues.includes(value)) {
            return;
        }

        const property = node.prop;

        if (config.never && config.never.includes(property)) {
            if (isVariable(value)) {
                const { column, line } = node.positionBy({
                    word: value
                });

                return [{
                    column,
                    line,
                    message: util.format(this.message, 'Variable', property)
                }];
            }
        }

        if (config.always && config.always.includes(property)) {
            if (!isVariable(value)) {
                const { column, line } = node.positionBy({
                    word: value
                });

                return [{
                    column,
                    line,
                    message: util.format(this.message, 'Non variable', property)
                }];
            }
        }
    }
};
