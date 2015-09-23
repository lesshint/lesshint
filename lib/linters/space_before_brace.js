'use strict';

module.exports = function (options) {
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
    if (node.type !== 'selector' && node.type !== 'atruleb' && node.type !== 'atruler') {
        return null;
    }

    if (node.type === 'selector' || node.type === 'atruler') {
        if (node.first('atrulerq')) {
            // Media queries without a space need special handling
            maybeSpace = node.first('atrulerq').last();
        } else {
            maybeSpace = node.last().last();
        }
    } else {
        // For atruleb and atruler the last element is actually the code block so take the second last
        maybeSpace = node.content[node.content.length - 2];
    }

    switch (config.spaceBeforeBrace.style) {
        case 'no_space':
            if (maybeSpace.type === 'space') {
                message = 'Opening curly brace should not be preceded by a space or new line.';
            }

            break;
        case 'one_space':
            if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                message = 'Opening curly brace should be preceded by one space.';

                if (maybeSpace.last().start) {
                    column = maybeSpace.last().start.column + maybeSpace.last().content.length;
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
            line: maybeSpace.start.line,
            linter: 'spaceBeforeBrace',
            message: message
        };
    }

    return null;
};
