'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'hexLength',
    nodeTypes: ['decl'],
    message: '%s should be written in the %s-form format.',

    lint: function hexLengthLinter (config, node) {
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
            let valid = true;

            switch (config.style) {
                case 'long':
                    if (color.length === 4 && !/^#[0-9a-f]{6}$/i.test(color)) {
                        valid = false;
                    }

                    break;
                case 'short':
                    // We want to allow longhand form on hex values that can't be shortened
                    if (color.length === 7) {
                        const canShorten = (color[1] === color[2] && color[3] === color[4] && color[5] === color[6]);

                        if (!/^#[0-9a-f]{3}$/i.test(color) && canShorten) {
                            valid = false;
                        }
                    }

                    break;
                default:
                    throw new Error(`Invalid setting value for hexLength: ${ config.style }`);
            }

            if (!valid) {
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
