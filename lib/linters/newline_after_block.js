'use strict';

module.exports = {
    name: 'newlineAfterBlock',
    nodeTypes: ['atrule', 'rule'],
    message: 'All blocks should be followed by a new line.',

    lint: function newlineAfterBlockLinter (config, node) {
        const parent = node.parent;

        let prev = parent.index(node) - 1;
        prev = parent.nodes[prev] || {};

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
        const regexp = /\n[ \t]*\n/;

        if (prev.type === 'comment') {
            if (Object.is(prev, parent.first) || regexp.test(prev.raws.before)) {
                return;
            }
        }

        if (!regexp.test(node.raws.before)) {
            return [{
                message: this.message
            }];
        }
    }
};
