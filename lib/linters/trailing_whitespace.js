'use strict';

module.exports = {
    name: 'trailingWhitespace',
    nodeTypes: ['root'],
    message: "There should't be any trailing whitespace.",

    lint: function trailingWhitespaceLinter (config, node) {

        var results = [];
        var self = this;

        // PostCSS has a few whitespace inconsistencies.
        // tracking in: https://github.com/postcss/postcss/issues/775
        // once those are resolved, we won't have to reparse the file.

        //Ignore empty files
        if (node.source.input.css.length === 0) {
            return;
        }
        // We'll convert the AST to the Less source and just loop through each line
        node = node.source.input.css;

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
    },

    suggestFix: function fixTrailingWhitespaceFailure (lint) {
        var whitespaceParts = lint.source.split(/\S/);

        return {
            range: {
                begin: lint.position - whitespaceParts[whitespaceParts.length - 1].length + 1,
                end: lint.position + 1
            },
            type: 'text-delete'
        };
    }
};
