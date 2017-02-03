'use strict';

const parser = require('postcss-selector-parser');

module.exports = {
    name: 'attributeQuotes',
    nodeTypes: ['rule'],
    message: 'Attribute selectors should use quotes.',

    lint: function attributeQuotesLinter (config, node) {
        if (!node.selector) {
            return;
        }

        const results = [];

        parser((selectors) => {
            selectors.walkAttributes((selector) => {
                if (selector.operator && !selector.quoted) {
                    const column = node.source.start.column + selector.source.start.column
                             + selector.attribute.length + selector.operator.length;

                    results.push({
                        column: column,
                        line: selector.source.start.line,
                        message: this.message
                    });
                }
            });
        }).process(node.selector);

        if (results.length) {
            return results;
        }
    }
};
