'use strict';

const parseSelector = require('../utils/parse-selector');

module.exports = {
    name: 'idSelector',
    nodeTypes: ['rule'],
    message: 'Selectors should not use IDs.',

    lint: function idSelectorLinter (config, node) {
        const tree = parseSelector(node);
        const excludes = config.exclude.map((id) => {
            // Remove #
            return id.replace(/^#/, '');
        });

        const results = [];

        tree.each((selector) => {
            selector.walkIds((id) => {
                if (excludes.indexOf(id.value) !== -1) {
                    return;
                }

                const position = node.positionBy({
                    word: id.toString().trim()
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
