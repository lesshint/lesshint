'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var maybeLine;

    // Bail if the linter isn't wanted
    if (!config.finalNewline || (config.finalNewline && !config.finalNewline.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'stylesheet') {
        return null;
    }

    maybeLine = node.content[node.content.length - 1];

    if (maybeLine && (maybeLine.type !== 'space' && maybeLine.content !== '\n')) {
        return {
            column: null,
            line: null,
            linter: 'finalNewline',
            message: 'Files should end with a newline.'
        };
    }

    return null;
};
