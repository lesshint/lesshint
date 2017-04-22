'use strict';

const parseSelector = require('../utils/parse-selector');
const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'stringQuotes',
    nodeTypes: ['atrule', 'decl', 'rule'],
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

        if (node.type === 'atrule') {
            /**
             * Hopefully node.ruleWithoutBody will be implemented on AtRule nodes
             * in the future: https://github.com/webschik/postcss-less/issues/55
             */
            if (node.nodes) {
                return;
            }

            // Not a string, bail
            if (!(/"|'/.test(node.params))) {
                return;
            }

            if (!quotes[config.style].test(node.params)) {
                const column = (node.raws.afterName ? node.raws.afterName.length : 0) +
                         node.source.start.column +
                         node.name.length + 1;

                results.push({
                    column: column,
                    line: node.source.start.line,
                    message: util.format(this.message, config.style)
                });
            }
        } else if (node.type === 'decl') {
            const ast = parseValue(node.value);

            ast.first.walk((decl) => {
                if (decl.type !== 'string') {
                    return;
                }

                if (!quotes[config.style].test(decl.raws.quote)) {
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
        } else {
            const selectors = parseSelector(node.selector);

            selectors.walkAttributes((selector) => {
                if (selector.quoted && !quotes[config.style].test(selector.value)) {
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
