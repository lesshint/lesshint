'use strict';

const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'spaceAroundComma',
    nodeTypes: ['decl', 'rule'],
    message: 'Commas should%s be %s by %s space.',

    lint: function spaceAroundCommaLinter (config, node) {
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
            if (child.type !== 'comma') {
                return;
            }

            const index = child.parent.index(child);
            const next = child.parent.nodes[index + 1];

            if (next === undefined) {
                return;
            }

            /**
             * The user has opted to ignore decls, etc where newlines are used
             * to separate comma-delimited lists.
             */
            if (config.allowNewline) {
                if (config.style === 'after' && /\n/g.test(next.raws.before)) {
                    return;
                }

                if (/\n/g.test(child.raws.before)) {
                    return;
                }
            }

            /**
             * Newlines aren't accounted for. Remove em cause we don't count
             * em (see #209). Users can choose to turn off trailing spaces and choose
             * to have trailing whitespace after a comma, but before a newline.
             * It's silly, but it's an available option.
             */
            if (next && next.raws && next.raws.before) {
                next.raws.before = next.raws.before.replace(/\n/g, '');
            }

            if (child && child.raws && child.raws.before) {
                child.raws.before = child.raws.before.replace(/\n/g, '');
            }

            let message;

            switch (config.style) {
                case 'after':
                    if (next.raws.before !== ' ') {
                        message = util.format(this.message, '', 'followed', 'one');
                    }

                    break;
                case 'before':
                    if (child.raws.before !== ' ') {
                        message = util.format(this.message, '', 'preceded', 'one');
                    }

                    break;
                case 'both':
                    if (child.raws.before !== ' ' || next.raws.before !== ' ') {
                        message = util.format(this.message, '', 'preceded and followed', 'one');
                    }

                    break;
                case 'none':
                    if (child.raws.before || next.raws.before) {
                        message = util.format(this.message, ' not', 'preceded nor followed', 'any');
                    }

                    break;
                default:
                    throw new Error(`Invalid setting value for spaceAfterComma: ${ config.style }`);
            }

            if (message) {
                results.push({
                    column: column + child.source.start.column - ','.length,
                    message: message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
