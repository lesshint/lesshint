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
    if (!config.urlFormat || (config.urlFormat && !config.urlFormat.enabled)) {
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

    url = value.first('string') || value.first('raw');
    url = url.content.replace(/['"]/g, '');

    switch (config.urlFormat.style) {
        case 'absolute':
            if (!/^['"]?(?:\w+:)?\/\/['"]?/.test(url)) {
                message = 'URL "' + url + '" should be absolute.';
            }

            break;
        case 'relative':
            if (/^['"]?(?:\w+:)?\/\/['"]?/.test(url)) {
                message = 'URL "' + url + '" should be relative.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for urlFormat: ' + config.urlFormat.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'urlFormat',
            message: message
        };
    }

    return true;
};
