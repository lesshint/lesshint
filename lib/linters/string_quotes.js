'use strict';

var selectorParser = require('postcss-selector-parser');
var valuesParser = require('postcss-values-parser');
var util = require('util');

module.exports = {
    name: 'stringQuotes',
    nodeTypes: ['atrule', 'decl', 'rule'],
    message: 'Strings should use %s quotes.',

    lint: function stringQuotesLinter (config, node) {
        var results = [];
        var self = this;
        var column;
        var ast;
        var quotes = {
            double: /"/,
            single: /'/
        };

        if (config.style && !quotes[config.style]) {
            throw new Error('Invalid setting value for stringQuotes: ' + config.style);
        }

        if (node.type === 'atrule') {
            /**
             * Hopefully node.ruleWithoutBody will be implemented on AtRule nodes
             * in the future: https://github.com/webschik/postcss-less/issues/55
             */
            if (node.nodes) {
                return;
            }

            if (!quotes[config.style].test(node.params)) {
                column = (node.raws.afterName ? node.raws.afterName.length : 0) +
                         node.source.start.column +
                         node.name.length + 1;

                results.push({
                    column: column,
                    line: node.source.start.line,
                    message: util.format(self.message, config.style)
                });
            }
        } else if (node.type === 'decl') {
            ast = valuesParser(node.value).parse();
            ast.first.walk(function (decl) {
                if (decl.type !== 'string') {
                    return;
                }

                if (!quotes[config.style].test(decl.raws.quote)) {
                    column = (node.raws.between ? node.raws.between.length : 0) +
                             node.source.start.column +
                             node.prop.length +
                             decl.source.start.column -
                             decl.raws.quote.length;

                    results.push({
                        column: column,
                        line: node.source.start.line,
                        message: util.format(self.message, config.style)
                    });
                }
            });
        } else {
            selectorParser(function (selectors) {
                selectors.walkAttributes(function (selector) {
                    if (selector.quoted && !quotes[config.style].test(selector.value)) {
                        column = node.source.start.column + selector.source.start.column
                                 + selector.attribute.length + selector.operator.length;

                        results.push({
                            column: column,
                            line: node.source.start.line,
                            message: util.format(self.message, config.style)
                        });
                    }
                });
            }).process(node.selector);
        }

        if (results.length) {
            return results;
        }
    }
};
