'use strict';

var parser = require('postcss-selector-parser');

module.exports = {
    name: 'idSelector',
    nodeTypes: ['rule'],
    message: 'Selectors should not use IDs.',

    lint: function idSelectorLinter (config, node) {
        // var valid = true;
        var excludes;
        var tree;
        var results = [];
        var self = this;

        parser(function (selectors) {
            tree = selectors;
        })
        .process(node.selector);

        excludes = config.exclude.map(function (id) {
            // Remove #
            return id.replace(/^\#/, '');
        });

        tree.each(function (selector) {
            selector.walkIds(function (id) {
                if (excludes.indexOf(id.value) >= 0) {
                    return;
                }

                results.push({
                    column: node.source.start.column + id.source.start.column - 1,
                    line: node.source.start.line,
                    message: self.message
                });
            });
        });

        if (results.length) {
            return results;
        }
    }
};
