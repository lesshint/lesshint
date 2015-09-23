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

    // passing an options object here, that just contains the data we actually need as params is superfelous
    // lint: function commentLinter (options) {
    lint: function commentLinter (config, node) {
        var regexp;

        // let the linter handle custom bits of its config
        if (config.comment.allowed) {
            regexp = new RegExp(config.comment.allowed);
        }

        if (!regexp || (regexp && !regexp.test(node.content))) {
            return {
                // column: node.start.column, < not needed in every linter
                // line: node.start.line,     < unless it needs to override for some reason
                message: message
            };
        }

        // superfelous. only *really* needed for folks that don't know that functions
        // return `undefined` by default.
        //return null;
    }
};

// module.exports = function (options) {
//     var config = options.config;
//     var node = options.node;
//     var regexp;

//     // Bail if the linter isn't wanted
//     if (!config.comment || (config.comment && !config.comment.enabled)) {
//         return null;
//     }

//     // Not applicable, bail
//     if (node.type !== 'multilineComment') {
//         return null;
//     }

//     if (config.comment.allowed) {
//         regexp = new RegExp(config.comment.allowed);
//     }

//     if (!regexp || (regexp && !regexp.test(node.content))) {
//         return {
//             column: node.start.column,
//             line: node.start.line,
//             linter: 'comment',
//             message: 'There shouldn\'t be any multi-line comments.'
//         };
//     }

//     return null;
// };
