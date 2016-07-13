'use strict';

module.exports = {
    name: 'importantRule',
    nodeTypes: ['decl'],
    message: '!important should not be used.',

    lint: function importantRuleLinter (config, node) {
        var pos = 1;

        if (node.important) {
            return [{
                column: node.source.start.column + node.prop.length + node.raws.between.length + node.value.length + pos,
                line: node.source.start.line,
                message: this.message
            }];
        }
    }
};
