'use strict';

module.exports = {
    name: 'trailingSemicolon',
    nodeTypes: ['rule', 'atrule'],
    message: 'All property declarations should end with a semicolon.',

    lint: function trailingSemicolonLinter (config, node) {
        const results = [];

        if (node.raws.semicolon === false) {
            node.each((child, index) => {
                if (child.type !== 'decl' || index !== node.nodes.length - 1) {
                    return;
                }

                results.push({
                    column: child.source.end.column + 1,
                    line: child.source.start.line,
                    message: this.message
                });
            });
        }

        if (results.length) {
            return results;
        }
    }
};
