'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var selector;
    var message;
    var value;

    // Bail if the linter isn't wanted
    if (!config.attributeQuotes || (config.attributeQuotes && !config.attributeQuotes.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'simpleSelector') {
        return null;
    }

    selector = node.first('attribute');

    // Bail if no attribute selectors are found
    if (!selector) {
        return null;
    }

    // Use last ident when no quotes are present
    value = selector.first('string') || selector.last('ident');

    switch (config.attributeQuotes.style) {
        case 'double':
            if (!/".*"/.test(value.content)) {
                message = 'Attribute selectors should use double quotes.';
            }

            break;
        case 'single':
            if (!/'.*'/.test(value.content)) {
                message = 'Attribute selectors should use single quotes.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for attributeQuotes: ' + config.attributeQuotes.style
            );
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'attributeQuotes',
            message: message
        };
    }

    return null;
};
