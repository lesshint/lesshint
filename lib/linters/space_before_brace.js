'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
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
            file: filename,
            line: selector.start.line,
            linter: 'spaceBeforeBrace',
            message: 'Opening curly brace should be preceded by one space.'
        };
    }

    return true;
};
