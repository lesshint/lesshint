'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
    var start;

    // Bail if the linter isn't wanted
    if (!config.spaceBeforeComma || (config.spaceBeforeComma && !config.spaceBeforeComma.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'arguments' && node.type !== 'parentheses') {
        return null;
    }

    node.content.some(function (element, index) {
        if (element.type !== 'operator') {
            return;
        }

        switch (config.spaceBeforeComma.style) {
            case 'no_space':
                if (node.content[index - 1] && node.content[index - 1].type === 'space') {
                    message = 'Commas should not be preceded by any space.';
                    start = node.content[index - 1].start;

                    return true;
                }

                break;
            case 'one_space':
                if (node.content[index - 1] && (node.content[index - 1].type !== 'space' || node.content[index - 1].content !== ' ')) {
                    message = 'Commas should be preceded by one space.';
                    start = node.content[index - 1].start;

                    return true;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for spaceBeforeComma: ' + config.spaceBeforeComma.style
                );
        }

        return false;
    });

    if (message) {
        return {
            column: start.column,
            file: filename,
            line: start.line,
            linter: 'spaceBeforeComma',
            message: message
        };
    }

    return null;
};
