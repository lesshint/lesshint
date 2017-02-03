'use strict';

const parser = require('postcss-selector-parser');

module.exports = {
    name: 'idSelector',
    nodeTypes: ['rule'],
    message: 'Selectors should not use IDs.',

    lint: function idSelectorLinter (config, node) {
        let tree;

        parser(function (selectors) {
            tree = selectors;
        })
        .process(node.selector);

        const excludes = config.exclude.map(function (id) {
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
