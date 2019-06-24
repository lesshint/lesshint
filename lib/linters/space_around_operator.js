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
            if (child.type !== 'number' && child.type !== 'operator') {
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

            // Ignore any _numbers_ that don’t start with an operator
            if (child.type === 'number' && !/^[+\-\*\/]/.test(child.value)) {
                return;
            }

            // Ignore any numbers that aren’t preceded by a number
            if (child.type === 'number' && (!prevElement || prevElement.type !== 'number')) {
                return;
            }

            let operator;
            let message;

            let nextElementBefore = (nextElement && nextElement.raws) ? nextElement.raws.before : false;
            switch (config.style) {
                case 'both':
                    if (child.raws.before !== ' ' || !/^\s/.test(child.raws.before) || nextElementBefore !== ' ' || !/\s$/.test(nextElementBefore)) {
                        operator = child.value;
                        message = util.format(this.message, '', 'preceded and followed', 'one');
                    }

                    break;
                case 'none':
                    if (/\s+$/.test(child.raws.before) || /^\s+/.test(nextElementBefore)) {
                        operator = child.value;
                        message = util.format(this.message, ' not', 'preceded nor followed', 'any');
                    }

                    break;
                default:
                    throw new Error(`Invalid setting value for spaceAfterOperator: ${ config.style }`);
            }

            if (message) {
                const { column, line } = node.positionBy({
                    word: operator
                });

                results.push({
                    column,
                    line,
                    message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
