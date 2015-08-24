'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];
    var first;
    var last;

    // Bail if the linter isn't wanted
    if (!config.spaceBetweenParens || (config.spaceBetweenParens && !config.spaceBetweenParens.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'arguments' && node.type !== 'parentheses') {
        return null;
    }

    first = node.first();
    last = node.last();

    switch (config.spaceBetweenParens.style) {
        case 'no_space':
            if (first && first.type === 'space') {
                results.push({
                    column: first.start.column,
                    line: first.start.line,
                    message: 'Opening parenthesis should not be followed by any space.'
                });
            }

            if (last && last.type === 'space') {
                results.push({
                    column: last.start.column,
                    line: last.start.line,
                    message: 'Closing parenthesis should not be preceded by any space.'
                });
            }

            break;
        case 'one_space':
            if (first && (first.type !== 'space' || first.content !== ' ')) {
                results.push({
                    column: first.start.column,
                    line: first.start.line,
                    message: 'Opening parenthesis should be followed by one space.'
                });
            }

            if (last && (last.type !== 'space' || last.content !== ' ')) {
                results.push({
                    column: last.start.column,
                    line: last.start.line,
                    message: 'Closing parenthesis should be preceded by one space.'
                });
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for spaceBetweenParens: ' + config.spaceBetweenParens.style
            );
    }

    if (results.length) {
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'spaceBetweenParens',
                message: result.message
            };
        });
    }

    return null;
};
