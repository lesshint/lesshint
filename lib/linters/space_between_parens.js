'use strict';

var parser = require('postcss-values-parser');
var util = require('util');

module.exports = {
    name: 'spaceBetweenParens',
    nodeTypes: ['decl', 'rule'],
    message: {
        opening: 'Opening parenthesis should%s be %s by %s space.',
        closing: 'Closing parenthesis should%s be %s by %s space.'
    },

    lint: function spaceBetweenParensLinter (config, node) {
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
            var index;
            var prev;
            var next;

            if (child.type !== 'paren') {
                return;
            }

            index = child.parent.index(child);
            prev = child.parent.nodes[index - 1];
            next = child.parent.nodes[index + 1];

            switch (config.style) {
                case 'no_space':
                    if (child.value === '(' && (next.raws && next.raws.before)) {
                        results.push({
                            column: column + child.source.start.column,
                            line: child.source.start.line,
                            message: util.format(self.message.opening, ' not', 'followed', 'any')
                        });
                    }

                    if (child.value === ')' && (prev.raws && prev.raws.after)) {
                        results.push({
                            column: column + prev.source.end.column,
                            line: prev.source.end.line,
                            message: util.format(self.message.closing, ' not', 'preceded', 'any')
                        });
                    }

                    break;
                case 'one_space':
                    if (child.value === '(' && (next.raws && next.raws.before !== ' ')) {
                        results.push({
                            column: column + child.source.start.column,
                            line: child.source.start.line,
                            message: util.format(self.message.opening, '', 'followed', 'one')
                        });
                    }

                    if (child.value === ')' && (prev.raws && prev.raws.after !== ' ')) {
                        results.push({
                            column: column + prev.source.end.column,
                            line: prev.source.end.line,
                            message: util.format(self.message.closing, '', 'preceded', 'one')
                        });
                    }
                    break;
                default:
                    throw new Error('Invalid setting value for spaceBetweenParens: ' + config.style);
            }
        });

        if (results.length) {
            return results;
        }
    }
};
