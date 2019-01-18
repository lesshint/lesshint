'use strict';

const hasNewline = require('../utils/has-newline');

const isValidAfter = (node, index) => {
    const next = node.parent.nodes[index + 1];

    // Nothing after, valid
    if (!next) {
        return true;
    }

    // Followed by comment or next node is on a new line, valid
    if (next.type === 'comment' || hasNewline(next.raws.before)) {
        return true;
    }

    return false;
};

module.exports = {
    name: 'singleLinePerProperty',
    nodeTypes: ['rule'],
    message: 'Each property should be on its own line.',

    lint: function singleLinePerPropertyLinter (config, node) {
        if (node.mixin) {
            return;
        }

        const nodeEnd = node.source.end || {};

        if (config.allowSingleLineRules) {
            if (node.source.start.line === nodeEnd.line && node.nodes.length === 1) {
                return;
            }
        }

        const types = ['atrule', 'decl', 'rule'];
        const results = [];

        node.nodes.forEach((child, index) => {
            if (!types.includes(child.type)) {
                return;
            }

            const childEnd = child.source.end || {};
            const validBefore = hasNewline(child.raws.before);
            let validAfter = isValidAfter(child, index);

            // Check if the closing bracket is on the same line as the last property
            if (index === node.nodes.length - 1 && childEnd.line === nodeEnd.line) {
                validAfter = false;
            }

            if (!(validBefore && validAfter)) {
                results.push({
                    column: child.source.start.column,
                    line: child.source.start.line,
                    message: this.message
                });
            }
        }, this);

        if (results.length) {
            return results;
        }
    }
};
