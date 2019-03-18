'use strict';

const isVariable = require('../utils/is-variable');

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

        // Ignore variables
        if (isVariable(node)) {
            return;
        }

        // Ignore mixin calls
        if (node.mixin && !node.nodes) {
            return;
        }

        // Ignore at-rules without a body
        if (node.type === 'atrule' && !node.nodes) {
            return;
        }

        const regexp = /\r?\n[ \t]*\r?\n/;

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
