'use strict';

module.exports = {
    name: 'finalNewline',
    nodeTypes: ['root'],
    message: 'Files should end with a newline.',

    lint: function finalNewlineLinter (config, node) {
        var source;

        if (node.source.input.css.length && node.raws.after !== '\n') {
            source = node.source.end ? node.source : node.last.source;

            return [{
                column: source.end.column + 1,
                line: source.end.line,
                message: this.message
            }];
        }
    },

    suggestFix: function fixFinalNewlineFailure (lint, config, node, rawLines) {
        var useWindowsEndlines;

        if (rawLines.length > 1 && rawLines[0][rawLines[0].length - 1] === '\n') {
            useWindowsEndlines = rawLines[0].substring(rawLines[0].length - 2) === '\r\n';
        } else {
            useWindowsEndlines = process.platform.indexOf('win') === 0;
        }

        return {
            insertion: useWindowsEndlines ? '\r\n' : '\n',
            range: {
                begin: lint.position
            },
            type: 'text-insert'
        };
    }
};
