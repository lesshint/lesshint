'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'hexValidation',
    nodeTypes: ['decl'],
    message: 'Hexadecimal color "%s" should be either three or six characters long.',

    lint: function hexValidationLinter (config, node) {
        /**
         * Just in case, since postcss will sometimes include the semicolon
         * in declaration values
         */
        node.value = node.value.replace(/;$/, '');

        const ast = parseValue(node.value);
        const results = [];

        ast.first.walk((child) => {
            if (child.type !== 'word') {
                return;
            }

            if (child.isHex && !child.isColor) {
                results.push({
                    column: node.source.start.column + node.prop.length + node.raws.between.length + child.source.start.column - 1,
                    message: util.format(this.message, child.value)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
