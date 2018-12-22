'use strict';

const parseSelector = require('../utils/parse-selector');
const parseValue = require('../utils/parse-value');
const hasQuotes = require('../utils/has-quotes');
const util = require('util');

module.exports = {
    name: 'stringQuotes',
    nodeTypes: ['atrule', 'decl', 'rule'],
    message: 'Strings should use %s quotes.',

    lint: function stringQuotesLinter (config, node) {
        const styles = ['double', 'single'];

        if (config.style && !styles.includes(config.style)) {
            throw new Error(`Invalid setting value for stringQuotes: ${ config.style }`);
        }

        const correctQuote = config.style === 'double' ? '"' : "'";
        const results = [];
        let tree;

        switch (node.type) {
            case 'atrule':
                if (node.nodes || !hasQuotes(node.params)) {
                    return;
                }

                if (config.avoidEscape && node.params.indexOf(correctQuote)) {
                    return;
                }

                if (!hasQuotes(node.params, config.style)) {
                    const column = node.raws.afterName.length +
                        node.source.start.column +
                        node.name.length + 1;

                    results.push({
                        column,
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

                    if (config.avoidEscape && decl.value.indexOf(correctQuote)) {
                        return;
                    }

                    if (!hasQuotes(decl.raws.quote, config.style)) {
                        const column = node.raws.between.length +
                                 node.source.start.column +
                                 node.prop.length +
                                 decl.source.start.column -
                                 decl.raws.quote.length;

                        results.push({
                            column,
                            line: node.source.start.line,
                            message: util.format(this.message, config.style)
                        });
                    }
                });

                break;
            default:
                tree = parseSelector(node);

                tree.walkAttributes((selector) => {
                    if (!selector.quoted) {
                        return;
                    }

                    if (config.avoidEscape && selector.value.indexOf(correctQuote)) {
                        return;
                    }

                    if (!hasQuotes(selector.getQuotedValue(), config.style)) {
                        const column = node.source.start.column +
                                selector.source.start.column +
                                selector.attribute.length +
                                selector.operator.length;

                        results.push({
                            column,
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
