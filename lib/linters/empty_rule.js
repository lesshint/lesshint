'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var block;

    // Bail if the linter isn't wanted
    if (!config.emptyRule || (config.emptyRule && !config.emptyRule.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'ruleset') {
        return null;
    }

    block = node.first('block') || {};

    if (block.content && (!block.content.length || (block.content.length === 1 && block.content[0].type === 'space'))) {
        return {
            column: node.start.column,
            file: filename,
            line: node.start.line,
            linter: 'emptyRule',
            message: 'There shouldn\'t be any empty rules present.'
        };
    }

    return true;
};
