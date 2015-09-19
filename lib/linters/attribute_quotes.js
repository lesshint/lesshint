'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var selector;
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

    // Bail if there's no value to check
    if (!selector.contains('attributeSelector')) {
        return null;
    }

    // Try and find a string
    value = selector.first('string');

    if (!value) {
        return {
            column: selector.start.column,
            line: selector.start.line,
            linter: 'attributeQuotes',
            message: 'Attribute selectors should use quotes.'
        };
    }

    return null;
};
