'use strict';

const parseSelector = require('../utils/parse-selector');
const parseValue = require('../utils/parse-value');
const hasQuotes = require('../utils/has-quotes');
const util = require('util');

module.exports = {
    name: 'stringQuotes',
    nodeTypes: ['atrule', 'decl', 'import', 'rule'],
    message: 'Strings should use %s quotes.',

    lint: function stringQuotesLinter (config, node) {
        const quotes = {
            double: /"/,
            single: /'/
        };

        if (config.style && !quotes[config.style]) {
            throw new Error(`Invalid setting value for stringQuotes: ${ config.style }`);
        }

        const results = [];
        let tree;

        switch (node.type) {
            case 'atrule':
                /**
                 * Hopefully node.empty will be implemented on AtRule nodes
                 * in the future: https://github.com/webschik/postcss-less/issues/55
                 */
                if (node.nodes) {
                    return;
                }

                if (hasQuotes(node.params) && !hasQuotes(node.params, config.style)) {
                    const column = (node.raws.afterName ? node.raws.afterName.length : 0) +
                             node.source.start.column +
                             node.name.length + 1;

                    results.push({
                        column: column,
                        line: node.source.start.line,
                        message: util.format(this.message, config.style)
                    });
                }

                break;
            case 'decl':
                tree = parseValue(node.value);

                tree.first.walk((decl) => {
                    if (decl.type !== 'string') {
                        return;
                    }

                    if (!hasQuotes(decl.raws.quote, config.style)) {
                        const column = (node.raws.between ? node.raws.between.length : 0) +
                                 node.source.start.column +
                                 node.prop.length +
                                 decl.source.start.column -
                                 decl.raws.quote.length;

                        results.push({
                            column: column,
                            line: node.source.start.line,
                            message: util.format(this.message, config.style)
                        });
                    }
                });

                break;
            case 'import':
                if (hasQuotes(node.importPath) && !hasQuotes(node.importPath, config.style)) {
                    const column = (node.raws.afterName ? node.raws.afterName.length : 0) +
                             node.source.start.column +
                             node.name.length + 1;

                    results.push({
                        column: column,
                        line: node.source.start.line,
                        message: util.format(this.message, config.style)
                    });
                }

                break;
            default:
                tree = parseSelector(node);

                tree.walkAttributes((selector) => {
                    if (selector.quoted && !hasQuotes(selector.value, config.style)) {
                        const column = node.source.start.column + selector.source.start.column
                                 + selector.attribute.length + selector.operator.length;

                        results.push({
                            column: column,
                            line: node.source.start.line,
                            message: util.format(this.message, config.style)
                        });
                    }
                });
        }

        if (results.length) {
            return results;
        }
    }
};
