'use strict';

module.exports = {
    name: 'blankLineAfterBlock',
    nodeTypes: ['atrule', 'rule'],
    message: 'All blocks should be followed by a blank line.',

    lint: function blankLineAfterBlockLinter (config, node) {
        /**
         * If it's the first node, ignore it since we actually check
         * if the node is preceded by en an empty line
         */
        if (Object.is(node, node.parent.first)) {
            return;
        }

        // Ignore at-rules without a body
        if (node.ruleWithoutBody || (node.type === 'atrule' && !node.nodes)) {
            /**
             * Hopefully node.ruleWithoutBody will be implemented on AtRule nodes
             * in the future: https://github.com/webschik/postcss-less/issues/55
             */
            return;
        }

        if (node.raws.before !== '\n\n') {
            return [{
                message: this.message
            }];
        }
    }
};
