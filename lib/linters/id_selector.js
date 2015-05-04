'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
    var start;

    // Bail if the linter isn't wanted
    if (config.idSelector && !config.idSelector.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    node.forEach('simpleSelector', function (selector) {
        selector.content.some(function (selector) {
            if (selector.type === 'id') {
                message = 'Selectors should not use IDs.';
                start = selector.start;

                return true;
            }

            return false;
        });
    });

    if (message) {
        return {
            column: start.column,
            file: filename,
            line: start.line,
            linter: 'idSelector',
            message: message
        };
    }

    return true;
};
