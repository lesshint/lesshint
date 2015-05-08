'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
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
        message = '!important should not be used.';
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'importantRule',
            message: message
        };
    }

    return true;
};
