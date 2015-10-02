'use strict';

module.exports = {
    name: 'comment',
    nodeTypes: ['multilineComment'],

    // if we put this here, the specs don't need to copy/paste
    // the error messages. pain saver.
    // also makes it obvious where in the file the actual message is kept
    // this may fail if a linter has multiple messages, in which case we
    // can make this an object
    message: 'There shouldn\'t be any multi-line comments.',

    lint: function commentLinter (config, node) {
        var regexp;

        // let the linter handle custom bits of its config
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
