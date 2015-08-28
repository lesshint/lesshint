'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];

    // Bail if the linter isn't wanted
    if (!config.spaceBeforeComma || (config.spaceBeforeComma && !config.spaceBeforeComma.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'arguments' && node.type !== 'parentheses') {
        return null;
    }

    node.forEach('operator', function (element, index) {
        var start;

        if (element.content !== ',') {
            return;
        }

        element = node.content[index - 1];
        start = element.start;

        switch (config.spaceBeforeComma.style) {
            case 'no_space':
                if (element.type === 'space') {
                    results.push({
                        column: start.column,
                        line: start.line,
                        message: 'Commas should not be preceded by any space.'
                    });
                }

                break;
            case 'one_space':
                if (element.type !== 'space' || element.content !== ' ') {
                    results.push({
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

    if (results.length) {
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'spaceBeforeComma',
                message: result.message
            };
        });
    }

    return null;
};
