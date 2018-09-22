'use strict';

module.exports = {
    name: 'importantRule',
    nodeTypes: ['decl'],
    message: '!important should not be used.',

    lint: function importantRuleLinter (config, node) {
        if (node.important) {
            const { column, line } = node.positionBy({
                word: node.raws.important || '!important'
            });

            return [{
                column,
                line,
                message: this.message
            }];
        }
    }
};
