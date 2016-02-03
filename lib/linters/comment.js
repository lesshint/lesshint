'use strict';

module.exports = {
    name: 'comment',
    nodeTypes: ['multilineComment'],
    message: "There shouldn't be any multi-line comments.",

    lint: function commentLinter (config, node) {
        var regexp;

        if (config.allowed) {
            regexp = new RegExp(config.allowed);
        }

        if (!regexp || (regexp && !regexp.test(node.content))) {
            return [{
                message: this.message
            }];
        }
    }
};
