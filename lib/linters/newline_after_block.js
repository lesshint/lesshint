'use strict';

module.exports = {
    name: 'newlineAfterBlock',
    nodeTypes: ['atrule', 'rule'],
    message: 'All blocks should be followed by a new line.',

    lint: function newlineAfterBlockLinter (config, node) {
        let next = node.next();

        // Nothing to check, bail
        if (!next) {
            return;
        }

        const regexp = /\r?\n[ \t]*\r?\n/;

        // Ignore mixin calls
        if (node.mixin && !node.nodes) {
            return;
        }

        /**
         * Allow following comments without a empty line,
         * but account for an empty line after the comment.
         */
        while (next.type === 'comment') {
            if (regexp.test(next.raws.before)) {
                return;
            }

            next = next.next ? next.next() : {};
        }

        if (!regexp.test(next.raws.before)) {
            return [{
                message: this.message
            }];
        }
    }
};
