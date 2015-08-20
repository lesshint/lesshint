'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var errors = [];

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
            errors.push({
                column: element.start.column,
                line: element.start.line,
                message: 'Each selector should be on its own line.'
            });
        }
    });

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                line: error.line,
                linter: 'singleLinePerSelector',
                message: error.message
            };
        });
    }

    return null;
};
