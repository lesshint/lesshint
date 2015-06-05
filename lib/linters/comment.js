'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var regexp;

    // Bail if the linter isn't wanted
    if (!config.comment || (config.comment && !config.comment.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'multilineComment') {
        return null;
    }

    if (config.comment.allowed) {
        regexp = new RegExp(config.comment.allowed);
    }

    if (!regexp || (regexp && !regexp.test(node.content))) {
        return {
            column: node.start.column,
            file: filename,
            line: node.start.line,
            linter: 'comment',
            message: 'There shouldn\'t be any multi-line comments.'
        };
    }

    return null;
};
