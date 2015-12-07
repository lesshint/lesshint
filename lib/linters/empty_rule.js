'use strict';

module.exports = {
    name: 'emptyRule',
    nodeTypes: ['ruleset'],
    message: "There shouldn't be any empty rules present.",

    lint: function emptyRuleLinter (config, node) {
        var block = node.first('block') || {};

        block.content = block.content || [];

        if (!block.content.length || (block.content.length === 1 && block.content[0].type === 'space')) {
            return [{
                message: this.message
            }];
        }
    }
};
