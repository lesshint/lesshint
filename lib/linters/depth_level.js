'use strict';

const util = require('util');

module.exports = {
    name: 'depthLevel',
    nodeTypes: ['rule'],
    message: "There shouldn't be more than '%s' levels deep from the style's parent, check the children's depth.",

    lint: function deepLevelLinter (config, node) {
        let levels = 1;

        node.walkRules(() => {
            levels++;
        });

        if (levels > config.depth) {
            return [{
                message: util.format(this.message, config.depth)
            }];
        }
    }
};
