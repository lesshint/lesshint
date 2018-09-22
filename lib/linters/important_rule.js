'use strict';

const { stringify } = require('postcss-less');

module.exports = {
    name: 'importantRule',
    nodeTypes: ['atrule', 'decl'],
    message: '!important should not be used.',

    lint: function importantRuleLinter (config, node) {
        if (node.important) {
            const important = node.raws.important || '!important';
            const nodeString = node.toString(stringify);

            const { column, line } = node.positionBy({
                index: nodeString.indexOf(important)
            });

            return [{
                column,
                line,
                message: this.message
            }];
        }
    }
};
