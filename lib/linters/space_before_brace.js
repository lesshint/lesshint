'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var maybeSpace;
    var message;
    var column;

    // Bail if the linter isn't wanted
    if (!config.spaceBeforeBrace || (config.spaceBeforeBrace && !config.spaceBeforeBrace.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    maybeSpace = node.content[node.content.length - 1];
    maybeSpace = maybeSpace.content[maybeSpace.content.length - 1];

    switch (config.spaceBeforeBrace.style) {
        case 'no_space':
            if (maybeSpace.type === 'space') {
                message = 'Opening curly brace should not be preceded by a space or new line.';
            }

            break;
        case 'one_space':
            if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                message = 'Opening curly brace should be preceded by one space.';

                if (maybeSpace.content[0].start) {
                    column = maybeSpace.content[0].start.column + maybeSpace.content[0].content.length;
                } else {
                    column = maybeSpace.start.column + maybeSpace.content.length;
                }
            }

            break;
        case 'new_line':
            if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== '\n')) {
                message = 'Opening curly brace should be on it\'s own line.';
            }

            break;
        default:
            throw new Error('Invalid setting value for spaceBeforeBrace: ' + config.spaceBeforeBrace.style);
    }

    if (message) {
        return {
            column: column || maybeSpace.start.column,
            file: filename,
            line: maybeSpace.start.line,
            linter: 'spaceBeforeBrace',
            message: message
        };
    }

    return true;
};
