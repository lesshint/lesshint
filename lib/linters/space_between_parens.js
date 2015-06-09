'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var errors = [];
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
                errors.push({
                    column: first.start.column,
                    line: first.start.line,
                    message: 'Opening parenthesis should not be followed by any space.'
                });
            }

            if (last && last.type === 'space') {
                errors.push({
                    column: last.start.column,
                    line: last.start.line,
                    message: 'Closing parenthesis should not be preceded by any space.'
                });
            }

            break;
        case 'one_space':
            if (first && (first.type !== 'space' || first.content !== ' ')) {
                errors.push({
                    column: first.start.column,
                    line: first.start.line,
                    message: 'Opening parenthesis should be followed by one space.'
                });
            }

            if (last && (last.type !== 'space' || last.content !== ' ')) {
                errors.push({
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

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'spaceBetweenParens',
                message: error.message
            };
        });
    }

    return null;
};
