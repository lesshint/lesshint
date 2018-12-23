'use strict';

module.exports = {
    name: 'newlineAfterBlock',
    nodeTypes: ['atrule', 'rule'],
    message: 'All blocks should be followed by a new line.',

    lint: function newlineAfterBlockLinter (config, node) {
        const { parent } = node;

        // Ignore at-rules without a body
        if (node.empty || (node.type === 'atrule' && !node.nodes)) {
            /**
             * Hopefully node.empty will be implemented on AtRule nodes
             * in the future: https://github.com/webschik/postcss-less/issues/55
             */
            return;
        }

        /**
         * If it's the first node in a block, ignore it since we actually check
         * if the node is preceded by an empty line
         */
        if (Object.is(node, parent.first)) {
            return;
        }

        /**
         * Allow a preceding comment without a empty line,
         * but account for an empty line before the comment,
         * unless it's the first comment of a block.
         */
        const regexp = /\r?\n[ \t]*\r?\n/;

        let prev = node.prev() || {};

        while (prev.type === 'comment') {
            if (Object.is(prev, parent.first) || regexp.test(prev.raws.before)) {
                return;
            }

            if (regexp.test(prev.raws.right)) {
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
