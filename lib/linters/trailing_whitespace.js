'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];

    // Bail if the linter isn't wanted
    if (!config.trailingWhitespace || (config.trailingWhitespace && !config.trailingWhitespace.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'stylesheet') {
        return null;
    }

    // We'll convert the AST to the Less source and just loop through each line
    node = node.toString('less');
    node.split('\n').forEach(function (line, index) {
        if (/[ \t]+$/g.test(line)) {
            results.push({
                line: index + 1 // Since index is zero-based
            });
        }
    });

    if (results.length) {
        return results.map(function (result) {
            return {
                column: null,
                line: result.line,
                linter: 'trailingWhitespace',
                message: "There should't be any trailing whitespace."
            };
        });
    }

    return null;
};
