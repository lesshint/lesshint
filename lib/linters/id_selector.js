'use strict';

const parseSelector = require('../utils/parse-selector');

module.exports = {
    name: 'idSelector',
    nodeTypes: ['rule'],
    message: 'Selectors should not use IDs.',

    lint: function idSelectorLinter (config, node) {
        const tree = parseSelector(node.selector);
        const excludes = config.exclude.map((id) => {
            // Remove #
            return id.replace(/^\#/, '');
        });

        const results = [];

        tree.each((selector) => {
            selector.walkIds((id) => {
                if (excludes.indexOf(id.value) >= 0) {
                    return;
                }

                results.push({
                    column: node.source.start.column + id.source.start.column - 1,
                    line: node.source.start.line + id.source.start.line - 1,
                    message: this.message
                });
            });
        });

        if (results.length) {
            return results;
        }
    }
};
