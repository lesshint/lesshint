'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'spaceAroundOperator',
    nodeTypes: ['decl'],
    message: 'Operators should%s be %s by %s space.',

    lint: function spaceAroundOperatorLinter (config, node) {
        const ast = parseValue(node.value);
        const results = [];

        ast.walk((child) => {
            if (child.type !== 'operator') {
                return;
            }

            const index = child.parent.index(child);
            const nextElement = child.parent.nodes[index + 1];
            const prevElement = child.parent.nodes[index - 1];


            // Ignore negative numbers
            if (child.value === '-' && (child.raws.before || node.raws.between) &&
                (nextElement.type === 'number' || nextElement.value === '(') && !nextElement.raws.before) {
                return;
            }
            // Ignore variables
            if (child.value === '-' && (child.raws.before || node.raws.between) &&
                nextElement.type === 'atword' && !nextElement.raws.before) {
                return;
            }

            // Ignore font-size/line-height shorthand declaration
            if (node.prop === 'font' && child.value === '/' &&
                prevElement.type === 'number' && nextElement.type === 'number') {
                return;
            }

            let operator;
            let message;

            switch (config.style) {
                case 'both':
                    if (child.raws.before !== ' ' || !/^\s/.test(child.raws.before) || nextElement.raws.before !== ' ' || !/\s$/.test(nextElement.raws.before)) {
                        operator = child.value;
                        message = util.format(this.message, '', 'preceded and followed', 'one');
                    }

                    break;
                case 'none':
                    if (child.raws.before || nextElement.raws.before) {
                        operator = child.value;
                        message = util.format(this.message, ' not', 'preceded nor followed', 'any');
                    }

                    break;
                default:
                    throw new Error(`Invalid setting value for spaceAfterOperator: ${ config.style }`);
            }

            if (message) {
                const position = node.positionBy({
                    word: operator
                });

                results.push({
                    column: position.column,
                    line: position.line,
                    message: message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
