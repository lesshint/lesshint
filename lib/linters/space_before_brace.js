'use strict';

module.exports = {
    name: 'spaceBeforeBrace',
    nodeTypes: ['atrule', 'mixin', 'rule'],
    message: {
        'new_line': 'Opening curly brace should be on its own line.',
        'no_space': 'Opening curly brace should not be preceded by a space or new line.',
        'one_space': 'Opening curly brace should be preceded by one space.'
    },

    lint: function spaceBeforeBraceLinter (config, node) {
        var column;
        var styles = {
            'new_line': /^\n$/,
            'no_space': /^$/,
            'one_space': /^\s$/
        };

        if (config.style && !styles[config.style]) {
            throw new Error('Invalid setting value for spaceBeforeBrace: ' + config.style);
        }

        if (node.ruleWithoutBody) {
            return;
        }

        if (!styles[config.style].test(node.raws.between)) {
            column = node.source.start.column;

            if (node.type === 'rule') {
                column += node.selector.length;
            } else if (node.type === 'atrule') {
                column += 1 + node.name.length + node.raws.afterName.length + node.params.length;
            }

            return [{
                column: column,
                line: node.source.start.line,
                message: this.message[config.style]
            }];
        }
    }
};
