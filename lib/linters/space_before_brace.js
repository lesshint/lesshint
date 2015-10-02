'use strict';

module.exports = {
    name: 'spaceBeforeBrace',
    nodeTypes: ['selector', 'atruleb', 'atruler'],
    message: {
        newLine: 'Opening curly brace should be on its own line.',
        noSpace: 'Opening curly brace should not be preceded by a space or new line.',
        oneSpace: 'Opening curly brace should be preceded by one space.'
    },

    lint: function spaceBeforeBraceLinter (config, node) {
        var maybeSpace;
        var message;
        var column;

        if (node.type === 'selector' || node.type === 'atruler') {
            if (node.first('atrulerq')) {
                // Media queries without a space need special handling
                maybeSpace = node.first('atrulerq').last();
            } else {
                maybeSpace = node.last().last();
            }
        } else {
            // For atruleb and atruler the last element is actually the code block so take the second last
            maybeSpace = node.content[node.content.length - 2];
        }

        switch (config.style) {
            case 'no_space':
                if (maybeSpace.type === 'space') {
                    message = this.message.noSpace;
                }

                break;
            case 'one_space':
                if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                    message = this.message.oneSpace;

                    if (maybeSpace.last().start) {
                        column = maybeSpace.last().start.column + maybeSpace.last().content.length;
                    } else {
                        column = maybeSpace.start.column + maybeSpace.content.length;
                    }
                }

                break;
            case 'new_line':
                if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== '\n')) {
                    message = this.message.newLine;
                }

                break;
            default:
                throw new Error('Invalid setting value for spaceBeforeBrace: ' + config.style);
        }

        if (message) {
            return [{
                column: column || maybeSpace.start.column,
                line: maybeSpace.start.line,
                message: message
            }];
        }
    }
};
