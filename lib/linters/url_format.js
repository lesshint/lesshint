'use strict';

const isAbsoluteURL = require('../utils/is-absolute-url');
const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'urlFormat',
    nodeTypes: ['decl'],
    message: 'URL "%s" should be %s.',

    lint: function urlFormatLinter (config, decl) {
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
        const ast = parseValue(decl.params || decl.value);
        const results = [];

        ast.first.nodes.forEach((child) => {
            if (child.type !== 'func' || child.value !== 'url') {
                return;
            }

            // Skip over the 'paren' node; the following node is the value node.
            const uri = child.first.next();

            if (!style[config.style](uri.value)) {
                const column = (decl.raws.between ? decl.raws.between.length : 0) +
                         decl.source.start.column +
                         decl.prop.length +
                         uri.source.start.column - 1;

                results.push({
                    column: column,
                    line: decl.source.start.line,
                    message: util.format(this.message, uri.value, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
