'use strict';

module.exports = function (options) {
    var node = options.node;
    var config = options.config;
    var status = 0;
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
        console.log(
            'spaceBeforeBrace %s:%d:%d Opening curly brace should be preceded by one space.',
            options.file,
            selector.start.line,
            selector.start.column
        );

        status = 1;
    }

    // A status greater than 1 means failure
    return status;
};
