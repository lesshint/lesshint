'use strict';

var find = require('lodash.find');
var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
    var start;

    // Bail if the linter isn't wanted
    if (config.trailingSemicolon && !config.trailingSemicolon.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'block') {
        return null;
    }

    if (node.content.splice(-2, 1)[0].type !== 'declarationDelimiter') {
        message = 'All property declarations should end with a semicolon.';

        start = node.content.pop().start;
    }

    if (message) {
        return {
            column: start.column,
            file: filename,
            line: start.line,
            linter: 'trailingSemicolon',
            message: message
        };
    }

    return true;
};
