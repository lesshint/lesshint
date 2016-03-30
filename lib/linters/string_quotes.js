'use strict';

var util = require('util');

module.exports = {
    name: 'stringQuotes',
    nodeTypes: ['decl'],
    message: 'Strings should use %s quotes.',

    lint: function stringQuotesLinter (config, decl) {

        var parser = require('postcss-values-parser');
        var ast = parser(decl.value).parse();
        var results = [];
        var quotes = {
            double: /"/,
            single: /'/
        };
        var self = this;

        if (config.style && !quotes[config.style]) {
            throw new Error('Invalid setting value for stringQuotes: ' + config.style);
        }

        ast.first.walk(function (node) {
            var column;

            if (node.type !== 'string') {
                return;
            }

            if (!quotes[config.style].test(node.raws.quote)) {

                column = (decl.raws.between ? decl.raws.between.length : 0) +
                         decl.source.start.column +
                         decl.prop.length +
                         node.source.start.column -
                         node.raws.quote.length;

                results.push({
                    column: column,
                    line: decl.source.start.line,
                    message: util.format(self.message, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
