'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var errors = [];

    // Bail if the linter isn't wanted
    if (!config.singleLinePerProperty || (config.singleLinePerProperty && !config.singleLinePerProperty.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'block') {
        return null;
    }

    node.forEach('declaration', function (element, index) {
        var prev = node.get(index - 1);
        var next = node.get(index + 2); // We need to move two nodes since the first one is the declaration delimiter (;)

        // If no sibling nodes were found, assume there's no new line
        if ((!prev || !next) || (prev.content.indexOf('\n') === -1 || next.content.indexOf('\n') === -1)) {
            errors.push({
                column: element.start.column,
                line: element.start.line,
                message: "Each property should be on it's own line."
            });
        }
    });

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                line: error.line,
                linter: 'singleLinePerProperty',
                message: error.message
            };
        });
    }

    return null;
};
