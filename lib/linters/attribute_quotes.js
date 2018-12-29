'use strict';

const parseSelector = require('../utils/parse-selector');
const nodeToString = require('../utils/node-to-string');

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
                const nodeString = nodeToString(node);
                const { column, line } = node.positionBy({
                    index: nodeString.indexOf(selector.value, selector.sourceIndex)
                });

                results.push({
                    column,
                    line,
                    message: this.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
