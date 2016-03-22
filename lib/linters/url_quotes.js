'use strict';

module.exports = {
    name: 'urlQuotes',
    nodeTypes: ['decl', 'atrule'],
    message: 'URLs should be enclosed in quotes.',

    lint: function urlQuotesLinter (config, node) {

        var parse = require('postcss-value-parser');
        var tree = parse(node.params || node.value);
        var first = tree.nodes[0];
        var uri;

        if (first.type !== 'function' || first.value !== 'url') {
            return;
        }

        uri = first.nodes[0];

        if (uri.type !== 'string') {
            // column numbers are gonna be jacked up here for a bit
            // postcss-value-parser doesn't have the same source values
            // that postcss nodes have.
            // tracking: https://github.com/TrySound/postcss-value-parser/issues/26
            return [{
                column: node.source.start.column,
                line: node.source.start.line,
                message: this.message
            }];
        }
    }
};
