'use strict';

const hasNewline = require('../utils/has-newline');
const parseValue = require('../utils/parse-value');
const util = require('util');

module.exports = {
    name: 'spaceAroundComma',
    nodeTypes: ['atrule', 'decl', 'rule'],
    message: 'Commas should%s be %s by %s space.',

    lint: function spaceAroundCommaLinter (config, node) {
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
            if (child.type !== 'comma') {
                return;
            }

            const next = child.next();
            if (!next) {
                return;
            }

            /**
             * The user has opted to ignore decls, etc where newlines are used
             * to separate comma-delimited lists.
             */
            if (config.allowNewline) {
                if (config.style === 'after' && hasNewline(next.raws.before)) {
                    return;
                }

                if (hasNewline(child.raws.before)) {
                    return;
                }
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
                const { column, line } = node.positionBy({
                    index: start + child.sourceIndex,
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
