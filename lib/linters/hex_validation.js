'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var color;

    // Bail if the linter isn't wanted
    if (!config.hexValidation || (config.hexValidation && !config.hexValidation.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'color') {
        return null;
    }

    color = '#' + node.content;
    if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
        return {
            column: node.start.column,
            line: node.start.line,
            linter: 'hexValidation',
            message: 'Hexadecimal color "' + color + '" should be either three or six characters long.'
        };
    }

    return null;
};
