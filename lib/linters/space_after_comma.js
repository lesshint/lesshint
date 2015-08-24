'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];

    // Bail if the linter isn't wanted
    if (!config.spaceAfterComma || (config.spaceAfterComma && !config.spaceAfterComma.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'arguments' && node.type !== 'parentheses') {
        return null;
    }

    node.forEach('operator', function (element, index) {
        var start;

        element = node.content[index + 1];
        start = element.start;

        switch (config.spaceAfterComma.style) {
            case 'no_space':
                if (element.type === 'space') {
                    results.push({
                        column: start.column,
                        line: start.line,
                        message: 'Commas should not be followed by any space.'
                    });
                }

                break;
            case 'one_space':
                if (element.type !== 'space' || element.content !== ' ') {
                    results.push({
                        column: start.column,
                        line: start.line,
                        message: 'Commas should be followed by one space.'
                    });
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for spaceAfterComma: ' + config.spaceAfterComma.style
                );
        }
    });

    if (results.length) {
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'spaceAfterComma',
                message: result.message
            };
        });
    }

    return null;
};
