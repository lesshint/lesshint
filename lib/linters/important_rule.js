'use strict';

module.exports = {
    name: 'importantRule',
    nodeTypes: ['decl'],
    message: '!important should not be used.',

    lint: function importantRuleLinter (config, node) {
        if (node.important) {
            return [{
                column: node.source.start.column + node.prop.length + node.raws.between.length + node.value.length + 1,
                line: node.source.start.line,
                message: this.message
            }];
        }
    }
};
