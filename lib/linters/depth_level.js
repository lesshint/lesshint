'use strict';

var util = require('util');

module.exports = {
    name: 'depthLevel',
    nodeTypes: ['rule'],
    message: "There shouldn't be more than '%s' levels deep from the style's parent, check the children's depth.",

    lint: function deepLevelLinter (config, node) {
        var depth = config.depth;
        var levels = 1;

        node.walkRules(function () {
            levels++;
        });

        if (levels > depth) {
            return [{
                message: util.format(this.message, depth)
            }];
        }
    }
};
