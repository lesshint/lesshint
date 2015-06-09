'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var errors = [];

    // Bail if the linter isn't wanted
    if (!config.spaceBeforeComma || (config.spaceBeforeComma && !config.spaceBeforeComma.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'arguments' && node.type !== 'parentheses') {
        return null;
    }

    node.forEach('operator', function (element, index) {
        var start = node.content[index - 1].start;

        switch (config.spaceBeforeComma.style) {
            case 'no_space':
                if (node.content[index - 1] && node.content[index - 1].type === 'space') {
                    errors.push({
                        column: start.column,
                        line: start.line,
                        message: 'Commas should not be preceded by any space.'
                    });
                }

                break;
            case 'one_space':
                if (node.content[index - 1] && (node.content[index - 1].type !== 'space' || node.content[index - 1].content !== ' ')) {
                    errors.push({
                        column: start.column,
                        line: start.line,
                        message: 'Commas should be preceded by one space.'
                    });
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for spaceBeforeComma: ' + config.spaceBeforeComma.style
                );
        }
    });

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'spaceBeforeComma',
                message: error.message
            };
        });
    }

    return null;
};
