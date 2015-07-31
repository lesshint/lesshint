'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var message;
    var value;
    var url;

    // Bail if the linter isn't wanted
    if (!config.urlQuotes || (config.urlQuotes && !config.urlQuotes.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    node.forEach('value', function (element) {
        value = element.first('uri');
    });

    // No URLs found, bail
    if (!value) {
        return null;
    }

    url = value.first('string');

    if (!url) {
        return {
            column: value.start.column,
            line: value.start.line,
            linter: 'urlQuotes',
            message: 'URLs should enclosed in quotes.'
        };
    }

    return null;
};
