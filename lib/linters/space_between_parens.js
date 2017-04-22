'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'spaceBetweenParens',
    nodeTypes: ['decl', 'rule'],
    message: {
        opening: 'Opening parenthesis should%s be %s by %s space.',
        closing: 'Closing parenthesis should%s be %s by %s space.'
    },

    lint: function spaceBetweenParensLinter (config, node) {
        let column = node.source.start.column;
        let value;

        if (node.params) {
            // A bit hacky, we're abusing the values parser for mixins etc.
            value = node.selector;
        } else if (node.type === 'decl') {
            value = node.value;
            column += node.prop.length + node.raws.between.length;
        } else {
            return;
        }

        const ast = parseValue(value);
        const results = [];

        ast.walk((child) => {
            if (child.type !== 'paren') {
                return;
            }

            const index = child.parent.index(child);
            const prev = child.parent.nodes[index - 1];
            const next = child.parent.nodes[index + 1];

            // issue #130: newlines aren't accounted for. remove em cause we
            // don't count em.
            if (next && next.raws && next.raws.before) {
                next.raws.before = next.raws.before.replace(/\n/g, '');
            }

            if (prev && prev.raws && prev.raws.after) {
                prev.raws.after = prev.raws.after.replace(/\n/g, '');
            }

            switch (config.style) {
                case 'no_space':
                    if (child.value === '(' && (next.raws && next.raws.before)) {
                        results.push({
                            column: column + child.source.start.column,
                            line: node.source.start.line,
                            message: util.format(this.message.opening, ' not', 'followed', 'any')
                        });
                    }

                    if (child.value === ')' && (prev.raws && prev.raws.after)) {
                        results.push({
                            column: column + prev.source.end.column,
                            line: node.source.start.line,
                            message: util.format(this.message.closing, ' not', 'preceded', 'any')
                        });
                    }

                    break;
                case 'one_space':
                    if (child.value === '(' && (next.raws && next.raws.before !== ' ')) {
                        results.push({
                            column: column + child.source.start.column,
                            line: node.source.start.line,
                            message: util.format(this.message.opening, '', 'followed', 'one')
                        });
                    }

                    if (child.value === ')' && (prev.raws && prev.raws.after !== ' ')) {
                        results.push({
                            column: column + prev.source.end.column,
                            line: node.source.start.line,
                            message: util.format(this.message.closing, '', 'preceded', 'one')
                        });
                    }
                    break;
                default:
                    throw new Error(`Invalid setting value for spaceBetweenParens: ${ config.style }`);
            }
        });

        if (results.length) {
            return results;
        }
    }
};
