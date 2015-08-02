'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var value;

    // Bail if the linter isn't wanted
    if (!config.importantRule || (config.importantRule && !config.importantRule.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    node.forEach('value', function (element) {
        value = element.first('important');
    });

    if (value) {
        return {
            column: value.start.column,
            line: value.start.line,
            linter: 'importantRule',
            message: '!important should not be used.'
        };
    }

    return null;
};
