'use strict';

const parseSelector = require('../utils/parse-selector');

module.exports = {
    name: 'universalSelector',
    nodeTypes: ['rule'],
    message: "The universal selector shouldn't be used.",

    lint: function universalSelectorLinter (config, node) {
        const tree = parseSelector(node.selector);
        const results = [];

        tree.each((selector) => {
            selector.walkUniversals((universal) => {
                const position = node.positionBy({
                    index: universal.sourceIndex
                });

                results.push({
                    column: position.column,
                    line: position.line,
                    message: this.message
                });
            });
        });

        if (results.length) {
            return results;
        }
    }
};
