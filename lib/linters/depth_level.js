'use strict';

var util = require('util');

/*Checks how many nested classes have every node*/
var countLevels = function (childNode, i, total) {
    var block = childNode.first('block') || {};

    total += 1;
    block.eachFor('ruleset', function (subchildNode, i) {
        total = countLevels(subchildNode, i, total);
    });
    return total;
};

module.exports = {
    name: 'depthLevel',
    nodeTypes: ['block'],
    message: "There shouldn't be more than '%s' levels deep from the style's parent, check the children's depth.",

    lint: function deepLevelLinter (config, node) {
        var depth = config.depth || 3;
        var error = false;

        node.eachFor('ruleset', function (childNode, i) {
            var levelsTotal = 1;

            levelsTotal = countLevels(childNode, i, levelsTotal);
            if (levelsTotal > depth) {
                error = true;
                return;
            }
        });

        if (error) {
            return [{
                message: util.format(this.message, depth)
            }];
        }
    }
};
