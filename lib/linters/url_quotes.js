'use strict';

const isVariable = require('../utils/is-variable');
const parseValue = require('../utils/parse-value');

module.exports = {
    name: 'urlQuotes',
    nodeTypes: ['decl', 'atrule'],
    message: 'URLs should be enclosed in quotes.',

    lint: function urlQuotesLinter (config, node) {
        // Nothing to check, bail
        if (!node.params && !node.value) {
            return;
        }

        const rDouble = /^\"(.+)\"$/;
        const rSingle = /^\'(.+)\'$/;
        const results = [];

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
                const column = (node.raws.between ? node.raws.between.length : 0) +
                         node.source.start.column +
                         (node.prop || node.name).length +
                         uri.source.start.column - 1;

                results.push({
                    column: column,
                    line: node.source.start.line,
                    message: this.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
