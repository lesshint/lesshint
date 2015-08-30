'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];

    // Bail if the linter isn't wanted
    if (!config.singleLinePerSelector || (config.singleLinePerSelector && !config.singleLinePerSelector.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    node.forEach('simpleSelector', function (element, index) {
        /*
         * Since the new line character is emitted together with each selector following the first one
         * we'll simply ignore the first selector and just check the rest for new line characters.
         */
        if (!index) {
            return true;
        }

        if (element.get(0).content.indexOf('\n') === -1) {
            results.push({
                column: element.start.column,
                line: element.start.line,
                message: 'Each selector should be on its own line.'
            });
        }
    });

    if (results.length) {
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'singleLinePerSelector',
                message: result.message
            };
        });
    }

    return null;
};
