'use strict';

var parser = require('postcss-values-parser');

module.exports = {
    name: 'urlQuotes',
    nodeTypes: ['decl', 'atrule'],
    message: 'URLs should be enclosed in quotes.',

    lint: function urlQuotesLinter (config, node) {
        var results = [];
        var rSingle = /^\'(.+)\'$/;
        var rDouble = /^\"(.+)\"$/;
        var self = this;
        var ast;

        // Nothing to check, bail
        if (!node.params && !node.value) {
            return;
        }

        ast = parser(node.params || node.value).parse();

        // traverse all child value-nodes
        // https://github.com/lesshint/lesshint/issues/225
        ast.first.nodes.forEach(function (child) {
            var func = child;
            var uri;
            var column;
            var value;

            if (func.type !== 'func' || func.value !== 'url') {
                return;
            }

            // skip over the 'paren' node; the following node is the value node.
            uri = func.first.next();
            value = uri.value.trim();

            // postcss-values-parser has a bug with url string params surrounded by
            // spaces. so account for that here.
            // tracking: https://github.com/lesshint/postcss-values-parser/issues/1
            if ((uri.type === 'word' &&
                !(rSingle.test(value) || rDouble.test(value))) &&
                uri.type !== 'string') {

                column = (node.raws.between ? node.raws.between.length : 0) +
                         node.source.start.column +
                         (node.prop || node.name).length +
                         uri.source.start.column - 1;

                results.push({
                    column: column,
                    line: node.source.start.line,
                    message: self.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
