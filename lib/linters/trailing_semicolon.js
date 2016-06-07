'use strict';

module.exports = {
    name: 'trailingSemicolon',
    nodeTypes: ['rule', 'atrule'],
    message: 'All property declarations should end with a semicolon.',

    lint: function trailingSemicolonLinter (config, node) {
        var results = [];
        var self = this;

        if (node.raws.semicolon === false) {
            node.each(function (child, index) {
                if (child.type !== 'decl' || index !== node.nodes.length - 1) {
                    return;
                }

                results.push({
                    column: child.source.end.column + 1,
                    line: child.source.start.line,
                    message: self.message
                });
            });
        }

        if (results.length) {
            return results;
        }
    }
};
