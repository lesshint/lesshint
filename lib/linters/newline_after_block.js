'use strict';

module.exports = {
    name: 'newlineAfterBlock',
    nodeTypes: ['atrule', 'rule'],
    message: 'All blocks should be followed by a new line.',

    lint: function newlineAfterBlockLinter (config, node) {
        var parent = node.parent;
        var prev;

        prev = parent.index(node) - 1;
        prev = parent.nodes[prev] || {};

        // Ignore at-rules without a body
        if (node.ruleWithoutBody || (node.type === 'atrule' && !node.nodes)) {
            /**
             * Hopefully node.ruleWithoutBody will be implemented on AtRule nodes
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
        if (prev.type === 'comment') {
            if (Object.is(prev, parent.first) || prev.raws.before.indexOf('\n\n') !== -1) {
                return;
            }
        }

        if (node.raws.before.indexOf('\n\n') === -1) {
            return [{
                message: this.message
            }];
        }
    }
};
