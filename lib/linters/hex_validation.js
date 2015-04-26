'use strict';

var find = require('lodash.find');
var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var message;
    var color;
    var value;

    // Bail if the linter isn't wanted
    if (config.hexValidation && !config.hexValidation.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    node.forEach('value', function (element) {
        value = find(element.content, function (element) {
            if (element.type === 'color') {
                return true;
            }

            return false;
        });
    });

    // No colors found, bail
    if (!value) {
        return null;
    }

    color = '#' + value.content;

    if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
        message = 'Hexadecimal colors should be either three or six characters long.';
    }

    if (message) {
        return {
            column: value.start.column,
            file: filename,
            line: value.start.line,
            linter: 'hexValidation',
            message: message
        };
    }

    return true;
};
