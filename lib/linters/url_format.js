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

            // Skip over the 'paren' node; the following node is the value node.
            const uri = child.first.next();
            const value = uri.value.trim();

            if (!style[config.style](value)) {
                const position = node.positionBy({
                    word: value
                });

                results.push({
                    column: position.column,
                    line: position.line,
                    message: util.format(this.message, uri.value, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
