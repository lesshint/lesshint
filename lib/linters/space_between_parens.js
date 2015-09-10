'use strict';

module.exports = {

    name: 'spaceBetweenParens',
    nodeTypes: ['arguments', 'parentheses'],
    message: {
        opening: 'Opening parenthesis should%s be %s by %s space.',
        closing: 'Closing parenthesis should%s be %s by %s space.'
    },

    lint: function spaceBetweenParensLinter (config, node) {
        var results = [];
        var first = node.first();
        var last = node.last();
        var sprintf = require('sprintf-js').sprintf;

        switch (config.spaceBetweenParens.style) {
            case 'no_space':
                if (first && first.type === 'space') {
                    results.push({
                        column: first.start.column,
                        line: first.start.line,
                        message: sprintf(this.message.opening, ' not', 'followed', 'any')
                    });
                }

                if (last && last.type === 'space') {
                    results.push({
                        column: last.start.column,
                        line: last.start.line,
                        message: sprintf(this.message.closing, ' not', 'preceded', 'any')
                    });
                }

                break;
            case 'one_space':
                if (first && (first.type !== 'space' || first.content !== ' ')) {
                    results.push({
                        column: first.start.column,
                        line: first.start.line,
                        message: sprintf(this.message.opening, '', 'followed', 'one')
                    });
                }

                if (last && (last.type !== 'space' || last.content !== ' ')) {
                    results.push({
                        column: last.start.column,
                        line: last.start.line,
                        message: sprintf(this.message.closing, '', 'preceded', 'one')
                    });
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for spaceBetweenParens: ' + config.spaceBetweenParens.style
                );
        }

        if (results.length) {
            return results;
        }
    }
};
