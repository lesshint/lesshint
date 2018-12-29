'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'spaceBetweenParens',
    nodeTypes: ['atrule', 'decl', 'rule'],
    message: {
        opening: 'Opening parenthesis should%s be %s by %s space.',
        closing: 'Closing parenthesis should%s be %s by %s space.'
    },

    lint: function spaceBetweenParensLinter (config, node) {
        let start;
        let value;

        if (node.mixin) {
            // A bit hacky, we're abusing the values parser for mixin declarations
            value = node.params;
            start = node.name.length + node.raws.identifier.length + node.raws.afterName.length;
        } else if (node.selector) {
            // Also a bit hacky, we're abusing the values parser for mixin includes
            value = node.selector;
            start = 0;
        } else if (node.type === 'decl') {
            value = node.value;
            start = node.prop.length + node.raws.between.length;
        } else {
            return;
        }

        const ast = parseValue(value);
        const results = [];

        ast.walk((child) => {
            if (child.type !== 'paren') {
                return;
            }

            const prev = child.prev();
            const next = child.next();

            // issue #130: newlines aren't accounted for. remove em cause we
            // don't count em.
            if (next && next.raws && next.raws.before) {
                next.raws.before = next.raws.before.replace(/\r?\n/g, '');
            }

            if (prev && prev.raws && prev.raws.after) {
                prev.raws.after = prev.raws.after.replace(/\r?\n/g, '');
            }

            switch (config.style) {
                case 'no_space':
                    if (child.value === '(' && (next.raws && next.raws.before)) {
                        const { column, line } = node.positionBy({
                            index: start + child.sourceIndex
                        });

                        results.push({
                            column: column + 1,
                            line,
                            message: util.format(this.message.opening, ' not', 'followed', 'any')
                        });
                    }

                    if (child.value === ')' && (prev.raws && prev.raws.after)) {
                        const { column, line } = node.positionBy({
                            index: start + child.sourceIndex
                        });

                        results.push({
                            column,
                            line,
                            message: util.format(this.message.closing, ' not', 'preceded', 'any')
                        });
                    }

                    break;
                case 'one_space':
                    if (child.value === '(' && (next.raws && next.raws.before !== ' ')) {
                        const { column, line } = node.positionBy({
                            index: start + child.sourceIndex
                        });

                        results.push({
                            column: column + 1,
                            line,
                            message: util.format(this.message.opening, '', 'followed', 'one')
                        });
                    }

                    if (child.value === ')' && (prev.raws && prev.raws.after !== ' ')) {
                        const { column, line } = node.positionBy({
                            index: start + child.sourceIndex
                        });

                        results.push({
                            column,
                            line,
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
