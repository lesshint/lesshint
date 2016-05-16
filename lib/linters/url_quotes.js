'use strict';

module.exports = {
    name: 'urlQuotes',
    nodeTypes: ['decl', 'atrule'],
    message: 'URLs should be enclosed in quotes.',

    lint: function urlQuotesLinter (config, node) {

        var parser = require('postcss-values-parser');
        var ast = parser(node.params || node.value).parse();
        var uri = ast.first.first;
        var column;
        var value;
        var rSingle = /^\'(.+)\'$/;
        var rDouble = /^\"(.+)\"$/;

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
