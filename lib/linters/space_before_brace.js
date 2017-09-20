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
        const styles = {
            'new_line': /^ *\t*\n *\t*$/,
            'no_space': /^$/,
            'one_space': /^ $/
        };

        if (config.style && !styles[config.style]) {
            throw new Error(`Invalid setting value for spaceBeforeBrace: ${ config.style }`);
        }

        // If the node is a bodiless rule or atrule, bail
        if (node.empty ||
           /**
            * Hopefully node.empty will be implemented on AtRule nodes
            * in the future: https://github.com/webschik/postcss-less/issues/55
            */
           (node.type === 'atrule' && !node.nodes)) {
            return;
        }

        if (!styles[config.style].test(node.raws.between)) {
            const position = node.positionBy({
                word: '{'
            });

            return [{
                column: position.column,
                line: position.line,
                message: this.message[config.style]
            }];
        }
    }
};
