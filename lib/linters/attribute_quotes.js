'use strict';

const parseSelector = require('../utils/parse-selector');

module.exports = {
    name: 'attributeQuotes',
    nodeTypes: ['rule'],
    message: 'Attribute selectors should use quotes.',

    lint: function attributeQuotesLinter (config, node) {
        if (!node.selector) {
            return;
        }

        const selectors = parseSelector(node);
        const results = [];

        selectors.walkAttributes((selector) => {
            if (selector.operator && !selector.quoted) {
                const column = node.source.start.column + selector.source.start.column
                         + selector.attribute.length + selector.operator.length;

                results.push({
                    column: column,
                    line: node.source.start.line + selector.source.start.line - 1,
                    message: this.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
