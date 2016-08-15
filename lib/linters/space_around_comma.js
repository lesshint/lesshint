'use strict';

var parser = require('postcss-values-parser');
var util = require('util');

module.exports = {
    name: 'spaceAroundComma',
    nodeTypes: ['decl', 'rule'],
    message: 'Commas should%s be %s by %s space.',

    lint: function spaceAroundCommaLinter (config, node) {
        var column = node.source.start.column;
        var results = [];
        var self = this;
        var ast;

        if (node.params) {
            // A bit hacky, we're abusing the values parser for mixins etc.
            ast = parser(node.selector).parse();
        } else if (node.type === 'decl') {
            ast = parser(node.value).parse();
            column += node.prop.length + node.raws.between.length;
        } else {
            return;
        }

        ast.walk(function (child) {
            var message;
            var index;
            var next;

            if (child.type !== 'comma') {
                return;
            }

            index = child.parent.index(child);
            next = child.parent.nodes[index + 1];

            // the user has opted to ignore decls, etc where newlines are used
            // to separate comma-delimited lists.
            if (config.allowNewline) {
                if (config.style === 'after' && /\n/g.test(next.raws.before)) {
                    return;
                }

                if (/\n/g.test(child.raws.before)) {
                    return;
                }
            }

            // newlines aren't accounted for. remove em cause we don't count
            // em. (#209) users can choose to turn off trailing spaces and choose
            // to have trailing whitespace after a comma, but before a newline.
            // it's silly, but it's an available option.
            if (next && next.raws && next.raws.before) {
                next.raws.before = next.raws.before.replace(/\n/g, '');
            }

            if (child && child.raws && child.raws.before) {
                child.raws.before = child.raws.before.replace(/\n/g, '');
            }

            switch (config.style) {
                case 'after':
                    if (next.raws.before !== ' ') {
                        message = util.format(self.message, '', 'followed', 'one');
                    }

                    break;
                case 'before':
                    if (child.raws.before !== ' ') {
                        message = util.format(self.message, '', 'preceded', 'one');
                    }

                    break;
                case 'both':
                    if (child.raws.before !== ' ' || next.raws.before !== ' ') {
                        message = util.format(self.message, '', 'preceded and followed', 'one');
                    }

                    break;
                case 'none':
                    if (child.raws.before || next.raws.before) {
                        message = util.format(self.message, ' not', 'preceded nor followed', 'any');
                    }

                    break;
                default:
                    throw new Error('Invalid setting value for spaceAfterComma: ' + config.style);
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
