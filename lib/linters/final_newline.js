'use strict';

module.exports = {
    name: 'finalNewline',
    nodeTypes: ['stylesheet'],
    message: 'Files should end with a newline.',

    lint: function finalNewlineLinter (config, node) {
        var maybeLine = node.last();

        if (maybeLine && (maybeLine.type !== 'space' && maybeLine.content !== '\n')) {
            return [{
                column: maybeLine.end.column + 1,
                line: maybeLine.end.line,
                message: this.message
            }];
        }
    }
};
