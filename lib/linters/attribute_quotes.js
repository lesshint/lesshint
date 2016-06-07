'use strict';

var parser = require('postcss-selector-parser');

module.exports = {
    name: 'attributeQuotes',
    nodeTypes: ['rule'],
    message: 'Attribute selectors should use quotes.',

    lint: function attributeQuotesLinter (config, node) {
        var results = [];
        var self = this;

        if (!node.selector) {
            return;
        }

        parser(function (selectors) {
            selectors.walkAttributes(function (selector) {
                var column;

                if (selector.operator && !selector.quoted) {
                    column = node.source.start.column + selector.source.start.column
                             + selector.attribute.length + selector.operator.length;

                    results.push({
                        column: column,
                        line: selector.source.start.line,
                        message: self.message
                    });
                }
            });
        }).process(node.selector);

        if (results.length) {
            return results;
        }
    }
};
