'use strict';

module.exports = {
    name: 'finalNewline',
    nodeTypes: ['stylesheet'],
    message: 'Files should end with a newline.',

    lint: function finalNewlineLinter (config, node) {
        var maybeLine = node.content[node.content.length - 1];

        if (maybeLine && (maybeLine.type !== 'space' && maybeLine.content !== '\n')) {
            return [{
                column: 0,
                line: node.content.length,
                message: this.message
            }];
        }
    }
};
