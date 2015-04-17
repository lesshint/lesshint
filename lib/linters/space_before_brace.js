'use strict';

module.exports = function (options) {
    var node = options.node;
    var config = options.config;
    var selector;

    // Bail if the linter isn't wanted
    if (config.spaceBeforeBrace && !config.spaceBeforeBrace.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    selector = node.content.pop().content.pop();

    if (selector.type !== 'space' && selector.content !== ' ') {
        return {
            column: selector.start.column,
            line: selector.start.line,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.'
        };
    }

    return true;
};
