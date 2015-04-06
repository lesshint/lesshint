'use strict';

module.exports = function spaceBeforeBrace (node, options) {
    var status = 0;
    var selector;

    // Bail if the linter isn't wanted
    if (options.spaceBeforeBrace && !options.spaceBeforeBrace.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    selector = node.content[0].content.pop();

    if (selector.type !== 'space' && selector.content !== ' ') {
        console.log(
            'spaceBeforeBrace %d:%d Opening curly brace should be preceded by one space.',
            selector.start.line,
            selector.start.column
        );

        status = 1;
    }

    // A status greater than 1 means failure
    return status;
};
