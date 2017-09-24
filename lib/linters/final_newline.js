'use strict';

module.exports = {
    name: 'finalNewline',
    nodeTypes: ['root'],
    message: 'Files should end with a newline.',

    lint: function finalNewlineLinter (config, node) {
        if (node.source.input.css.length && !/^(\r|\n)+$/.test(node.raws.after)) {
            const source = node.source.end ? node.source : node.last.source;

            return [{
                column: source.end.column + 1,
                line: source.end.line,
                message: this.message
            }];
        }
    }
};
