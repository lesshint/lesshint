'use strict';

module.exports = {
    name: 'trailingWhitespace',
    nodeTypes: ['stylesheet'],
    message: "There should't be any trailing whitespace.",

    lint: function trailingWhitespaceLinter (config, node) {
        var results = [];
        var self = this;

        // We'll convert the AST to the Less source and just loop through each line
        node = node.toString('less') || '';
        node.split('\n').forEach(function (line, index) {
            if (/[ \t]+$/g.test(line)) {
                results.push({
                    column: line.length,
                    line: index + 1, // Since index is zero-based
                    message: self.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
