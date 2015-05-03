'use strict';

var clone = require('lodash.clone');
var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = clone(options.node, true); // We need to break the object reference since we modify the node below
    var maybeLine;

    // Bail if the linter isn't wanted
    if (config.finalNewline && !config.finalNewline.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'stylesheet') {
        return null;
    }

    maybeLine = node.content.pop();

    if (maybeLine.type !== 'space' && maybeLine.content !== '\n') {
        return {
            column: null,
            file: filename,
            line: null,
            linter: 'finalNewline',
            message: 'Files should end with a newline.'
        };
    }

    return true;
};
