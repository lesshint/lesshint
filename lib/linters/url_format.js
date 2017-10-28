'use strict';

const isAbsoluteURL = require('../utils/is-absolute-url');
const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'urlFormat',
    nodeTypes: ['decl'],
    message: 'URL "%s" should be %s.',

    lint: function urlFormatLinter (config, node) {
        const style = {
            absolute: isAbsoluteURL,
            relative: (url) => {
                return !isAbsoluteURL(url);
            }
        };

        if (config.style && !style[config.style]) {
            throw new Error(`Invalid setting value for urlFormat: ${ config.style }`);
        }

        /**
         * Traverse all child value-nodes
         * https://github.com/lesshint/lesshint/issues/225
         */
        const results = [];
        const ast = parseValue(node.value);

        ast.first.nodes.forEach((child) => {
            if (child.type !== 'func' || child.value !== 'url') {
                return;
            }

            /**
             * We need to put the URL back together
             * because postcss-values-parser will split it
             */
            const uri = child.nodes.filter((childNode) => {
                return childNode.type !== 'paren';
            }).join('');

            const value = uri.trim().replace(/['"]/g, '');

            if (!style[config.style](value)) {
                const position = node.positionBy({
                    word: value
                });

                results.push({
                    column: position.column,
                    line: position.line,
                    message: util.format(this.message, value, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
