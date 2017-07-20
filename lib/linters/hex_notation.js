'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'hexNotation',
    nodeTypes: ['decl'],
    message: '%s should be written in %s.',

    lint: function hexNotationLinter (config, node) {
        const styles = {
            lowercase: /^#[0-9a-z]+$/,
            uppercase: /^#[0-9A-Z]+$/
        };

        if (config.style && !styles[config.style]) {
            throw new Error(`Invalid setting value for hexNotation: ${ config.style }`);
        }

        /**
         * Just in case, since postcss will sometimes include the semicolon
         * in declaration values
         */
        node.value = node.value.replace(/;$/, '');

        const ast = parseValue(node.value);
        const results = [];

        ast.first.walk((child) => {
            if (child.type !== 'word' || !child.isColor) {
                return;
            }

            const color = child.value;

            if (/^#\d+$/.test(color)) {
                return;
            }

            if (!styles[config.style].test(color)) {
                const position = node.positionBy({
                    word: color
                });

                results.push({
                    column: position.column,
                    line: position.line,
                    message: util.format(this.message, color, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
