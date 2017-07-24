'use strict';

const isVariable = require('../utils/is-variable');
const parseValue = require('../utils/parse-value');

module.exports = {
    name: 'urlQuotes',
    nodeTypes: ['atrule', 'decl', 'import'],
    message: 'URLs should be enclosed in quotes.',

    lint: function urlQuotesLinter (config, node) {
        // Nothing to check, bail
        if (!node.params && !node.value && !node.importPath) {
            return;
        }

        const rDouble = /^"(.+)"$/;
        const rSingle = /^'(.+)'$/;
        const results = [];

        if (node.type === 'import') {
            // If it's a Import node, we need some special handling
            if (!rSingle.test(node.importPath) && !rDouble.test(node.importPath)) {
                const position = node.positionBy({
                    word: node.importPath
                });

                results.push({
                    column: position.column,
                    line: position.line,
                    message: this.message
                });
            }
        } else {
            /**
             * Traverse all child value-nodes
             * https://github.com/lesshint/lesshint/issues/225
             */
            const ast = parseValue(node.params || node.value);

            ast.first.nodes.forEach((child) => {
                if (child.type !== 'func' || child.value !== 'url') {
                    return;
                }

                // skip over the 'paren' node; the following node is the value node.
                const uri = child.first.next();
                const value = uri.value.trim();

                if (isVariable(value)) {
                    return;
                }

                /**
                 * postcss-values-parser has a bug with url string params surrounded by
                 * spaces. So account for that here.
                 * Tracking: https://github.com/lesshint/postcss-values-parser/issues/1
                 */
                if ((uri.type === 'word' && !(rSingle.test(value) || rDouble.test(value))) && uri.type !== 'string') {
                    const position = node.positionBy({
                        word: value
                    });

                    results.push({
                        column: position.column,
                        line: position.line,
                        message: this.message
                    });
                }
            });
        }

        if (results.length) {
            return results;
        }
    }
};
