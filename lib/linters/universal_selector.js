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
            selector.walkUniversals((uni) => {
                results.push({
                    column: node.source.start.column + uni.source.start.column - 1,
                    line: node.source.start.line,
                    message: this.message
                });
            });
        });

        if (results.length) {
            return results;
        }
    }
};
