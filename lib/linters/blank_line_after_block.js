'use strict';

module.exports = {
    name: 'blankLineAfterBlock',
    nodeTypes: ['atrule', 'rule'],
    message: 'All blocks should be followed by a blank line.',

    lint: function blankLineAfterBlockLinter (config, node) {
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
         * If it's the first node, ignore it since we actually check
         * if the node is preceded by en an empty line
         */
        if (Object.is(node, parent.first)) {
            return;
        }

        /**
         * Allow a preceding comment without a blank line,
         * but account for a empty line before the comment.
         */
        if (prev.type === 'comment' && prev.raws.before === '\n\n') {
            return;
        }

        if (node.raws.before !== '\n\n') {
            return [{
                message: this.message
            }];
        }
    }
};
