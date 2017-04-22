'use strict';

const isVariable = require('../utils/is-variable');
const util = require('util');

module.exports = {
    name: 'variableValue',
    nodeTypes: ['decl'],
    message: '%s is not allowed in "%s" property.',

    lint: function variableValueLinter (config, node) {
        if (config.never && config.never.indexOf(node.prop) !== -1) {
            if (isVariable(node.value)) {
                return [{
                    column: node.source.start.column +
                            node.prop.length +
                            node.raws.between.length,
                    line: node.source.start.line,
                    message: util.format(this.message, 'Variable', node.prop)
                }];
            }
        }

        if (config.always && config.always.indexOf(node.prop) !== -1) {
            if (!isVariable(node.value)) {
                return [{
                    column: node.source.start.column +
                            node.prop.length +
                            node.raws.between.length,
                    line: node.source.start.line,
                    message: util.format(this.message, 'Non variable', node.prop)
                }];
            }
        }
    }
};
