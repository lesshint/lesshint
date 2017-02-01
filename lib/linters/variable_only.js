'use strict';

const util = require('util');

module.exports = {
    name: 'variableOnly',
    nodeTypes: ['decl'],
    message: 'The value of [%s] must be a variable.',

    lint: function variableOnlyLinter (config, node) {
        if (!config.enabled) {
            return;
        }

        if (config.properties.indexOf(node.prop) === -1) {
            return;
        }

        if (/^@/i.test(node.value)) {
            return;
        }

        return [{
            column: node.source.start.column + node.prop.length + node.raws.between.length,
            line: node.source.start.line,
            message: util.format(this.message, node.prop)
        }];
    }
};
