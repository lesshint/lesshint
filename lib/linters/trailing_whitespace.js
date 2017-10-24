'use strict';

module.exports = {
    name: 'trailingWhitespace',
    nodeTypes: ['root'],
    message: "There shouldn't be any trailing whitespace.",

    lint: function trailingWhitespaceLinter (config, node) {
        // Ignore empty files
        if (node.source.input.css.length === 0) {
            return;
        }

        // We'll convert the AST to the Less source and just loop through each line
        node = node.source.input.css;

        const results = [];

        node.split('\n').forEach((line, index) => {
            if (/[ \t]+$/g.test(line)) {
                results.push({
                    column: line.length,
                    line: index + 1, // Since index is zero-based
                    message: this.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
