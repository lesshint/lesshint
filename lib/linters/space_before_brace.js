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
            'new_line': /^\n *\t*$/,
            'no_space': /^$/,
            'one_space': /^ $/
        };

        if (config.style && !styles[config.style]) {
            throw new Error('Invalid setting value for spaceBeforeBrace: ' + config.style);
        }

        // if the node is a bodiless rule, or it's an import statement, or we
        // are dealing with an atrule without a body, bail.
        if (node.ruleWithoutBody || node.name === 'import' ||
           // hopefully node.ruleWithoutBody will be implemented on AtRule nodes
           // in the future: https://github.com/webschik/postcss-less/issues/55
           (node.type === 'atrule' && !node.nodes)) {
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
