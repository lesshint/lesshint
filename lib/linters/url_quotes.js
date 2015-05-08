'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
    var value;
    var url;

    // Bail if the linter isn't wanted
    if (config.urlQuotes && !config.urlQuotes.enabled) {
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

    url = value.content[0].content;

    switch (config.urlQuotes.style) {
        case 'no_quotes':
            if (/['"].*['"]/.test(url)) {
                message = 'URLs should not use quotes.';
            }

            break;
        case 'double':
            if (!/".*"/.test(url)) {
                message = 'URLs should use double quotes.';
            }

            break;
        case 'single':
            if (!/'.*'/.test(url)) {
                message = 'URLs should use single quotes.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for urlQuotes: ' + config.urlQuotes.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'urlQuotes',
            message: message
        };
    }

    return true;
};
