'use strict';

var util = require('util');

module.exports = {
    name: 'stringQuotes',
    nodeTypes: ['decl'],
    message: 'Strings should use %s quotes.',

    lint: function stringQuotesLinter (config, node) {

        var parse = require('postcss-value-parser');
        var tree = parse(node.value);
        var results = [];
        var quotes = {
            double: /"/,
            single: /'/
        };
        var self = this;

        if (config.style && !quotes[config.style]) {
            throw new Error('Invalid setting value for stringQuotes: ' + config.style);
        }

        // console.log(node);
        // unfortunately, postcss-value-parser doesn't have walk methods
        // so we've got to do that ourselves.
        // tracking: https://github.com/TrySound/postcss-value-parser/issues/26
        function walk (tree, fn) {
            tree.forEach(function (value) {
                fn.call(this, value);

                if (value.nodes && value.nodes.length) {
                    walk(value.nodes, fn);
                }
            });
        }

        walk(tree.nodes, function (value) {
            if (value.type !== 'string') {
                return;
            }

            if (!quotes[config.style].test(value.quote)) {
                results.push({
                    column: node.source.start.column,
                    line: node.source.start.line,
                    message: util.format(self.message, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
