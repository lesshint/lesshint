'use strict';

var helpers = require('../helpers');

module.exports = {
    name: 'spaceBeforeBrace',
    nodeTypes: ['atrule', 'mixin', 'ruleset'],
    message: {
        newLine: 'Opening curly brace should be on its own line.',
        noSpace: 'Opening curly brace should not be preceded by a space or new line.',
        oneSpace: 'Opening curly brace should be preceded by one space.'
    },

    lint: function spaceBeforeBraceLinter (config, node) {
        var maybeSpace = helpers.ensureObject(node.content[node.content.length - 2]);
        var block = node.first('block');
        var message;
        var column;

        // No block, no brace to check
        if (!block) {
            return;
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

                    // Fetch the position where the space should have been
                    column = block.start.column;
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
