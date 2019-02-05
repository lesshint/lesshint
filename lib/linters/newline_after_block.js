'use strict';

module.exports = {
    name: 'newlineAfterBlock',
    nodeTypes: ['atrule', 'rule'],
    message: 'All blocks should be followed by a new line.',

    lint: function newlineAfterBlockLinter (config, node) {
        const { parent } = node;

        // Ignore at-rules without a body (but not mixins)
        if (node.type === 'atrule' && !node.nodes && !node.mixin) {
            return;
        }

        /**
         * If it's the first node in a block, ignore it since we actually check
         * if the node is preceded by an empty line
         */
        if (Object.is(node, parent.first)) {
            return;
        }

        let prev = node.prev() || {};

        // If the previous node is a mixin call, ignore it
        if (prev.mixin && !prev.nodes) {
            return;
        }

        /**
         * Allow a preceding comment without a empty line,
         * but account for an empty line before the comment,
         * unless it's the first comment of a block.
         */
        const regexp = /\r?\n[ \t]*\r?\n/;

        while (prev.type === 'comment') {
            if (Object.is(prev, parent.first) || regexp.test(prev.raws.before)) {
                return;
            }

            prev = prev.prev ? prev.prev() : {};
        }

        if (!regexp.test(node.raws.before)) {
            return [{
                message: this.message
            }];
        }
    }
};
