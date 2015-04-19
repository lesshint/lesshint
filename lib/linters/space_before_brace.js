'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var selector;
    var message;

    // Bail if the linter isn't wanted
    if (config.spaceBeforeBrace && !config.spaceBeforeBrace.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    selector = node.content.pop().content.pop();

    switch (config.spaceBeforeBrace.style) {
        case 'no_space':
            if (selector.type !== 'space') {
                message = 'Opening curly brace should not be preceded a space or new line.';
            }

            break;
        case 'one_space':
            if (selector.type !== 'space' || (selector.type === 'space' && selector.content !== ' ')) {
                message = 'Opening curly brace should be preceded by one space.';
            }

            break;
        case 'new_line':
            if (selector.type !== 'space' || (selector.type === 'space' && selector.content !== '\n')) {
                message = 'Opening curly brace should be on it\'s own line.';
            }

            break;
        default:
            throw new Error('Invalid setting value for spaceBeforeBrace: ' + config.spaceBeforeBrace.style);
    }

    if (message) {
        return {
            column: selector.start.column,
            file: filename,
            line: selector.start.line,
            linter: 'spaceBeforeBrace',
            message: message
        };
    }

    return true;
};
