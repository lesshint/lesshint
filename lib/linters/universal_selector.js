'use strict';

const parseSelector = require('../utils/parse-selector');

module.exports = {
    name: 'universalSelector',
    nodeTypes: ['rule'],
    message: "The universal selector shouldn't be used.",

    lint: function universalSelectorLinter (config, node) {
        const tree = parseSelector(node);
        const results = [];

        tree.each((selector) => {
            selector.walkUniversals((universal) => {
                const { column, line } = node.positionBy({
                    index: universal.sourceIndex
                });

                results.push({
                    column,
                    line,
                    message: this.message
                });
            });
        });

        if (results.length) {
            return results;
        }
    }
};
