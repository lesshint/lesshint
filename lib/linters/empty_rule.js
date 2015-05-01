'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var result;
    var block;

    // Bail if the linter isn't wanted
    if (config.emptyRule && !config.emptyRule.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'ruleset') {
        return null;
    }

    block = node.first('block');

    // Nothing to lint found, bail
    if (!block) {
        return null;
    }

    result = block.content.some(function (element) {
        return element.type === 'declaration';
    });

    if (!result) {
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
