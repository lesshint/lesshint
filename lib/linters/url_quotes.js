'use strict';

var parser = require('postcss-values-parser');

module.exports = {
    name: 'urlQuotes',
    nodeTypes: ['decl', 'atrule'],
    message: 'URLs should be enclosed in quotes.',

    lint: function urlQuotesLinter (config, node) {
        var rSingle = /^\'(.+)\'$/;
        var rDouble = /^\"(.+)\"$/;
        var column;
        var value;
        var ast;
        var uri;

        // Nothing to check, bail
        if (!node.params && !node.value) {
            return;
        }

        ast = parser(node.params || node.value).parse();
        uri = ast.first.first;

        if (uri.type !== 'func' || uri.value !== 'url') {
            return;
        }

        uri = uri.first.next();
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

            return [{
                column: column,
                line: node.source.start.line,
                message: this.message
            }];
        }
    }
};
