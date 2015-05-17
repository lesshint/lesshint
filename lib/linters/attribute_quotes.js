'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var errors = [];

    // Bail if the linter isn't wanted
    if (!config.attributeQuotes || (config.attributeQuotes && !config.attributeQuotes.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    node.forEach('simpleSelector', function (selector) {
        var attribute = selector.first('attribute');
        var value;

        if (!attribute) {
            return;
        }

        // Use last ident when no quotes are present
        value = attribute.first('string') || attribute.last('ident');

        switch (config.attributeQuotes.style) {
            case 'double':
                if (!/".*"/.test(value.content)) {
                    errors.push({
                        message: 'Attribute selectors should use double quotes.',
                        column: value.start.column,
                        line: value.start.line
                    });
                }

                break;
            case 'single':
                if (!/'.*'/.test(value.content)) {
                    errors.push({
                        message: 'Attribute selectors should use single quotes.',
                        column: value.start.column,
                        line: value.start.line
                    });
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for attributeQuotes: ' + config.attributeQuotes.style
                );
        }
    });

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'attributeQuotes',
                message: error.message
            };
        });
    }

    return true;
};
