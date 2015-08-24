'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];

    // Bail if the linter isn't wanted
    if (!config.stringQuotes || (config.stringQuotes && !config.stringQuotes.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'stylesheet') {
        return null;
    }

    node.traverse(function (element) {
        if (element.type !== 'string') {
            return;
        }

        switch (config.stringQuotes.style) {
            case 'double':
                if (!/".*"/.test(element.content)) {
                    results.push({
                        message: 'Strings should use double quotes.',
                        column: element.start.column,
                        line: element.start.line
                    });
                }

                break;
            case 'single':
                if (!/'.*'/.test(element.content)) {
                    results.push({
                        message: 'Strings should use single quotes.',
                        column: element.start.column,
                        line: element.start.line
                    });
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for stringQuotes: ' + config.stringQuotes.style
                );
        }
    });

    if (results.length) {
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'stringQuotes',
                message: result.message
            };
        });
    }

    return null;
};
