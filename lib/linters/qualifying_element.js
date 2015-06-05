'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var error = {};

    // Bail if the linter isn't wanted
    if (!config.qualifyingElement || (config.qualifyingElement && !config.qualifyingElement.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'simpleSelector') {
        return null;
    }

    node.content.forEach(function (selector, index) {
        if (!node.content[index - 1] || node.content[index - 1].type !== 'ident') {
            return;
        }

        switch (selector.type) {
            case 'attribute':
                if (config.qualifyingElement.allowWithAttribute) {
                    return;
                }

                error = {
                    message: 'Attribute selectors should not include a qualifying element.',
                    column: selector.start.column,
                    line: selector.start.line
                };

                break;
            case 'class':
                if (config.qualifyingElement.allowWithClass) {
                    return;
                }

                error = {
                    message: 'Class selectors should not include a qualifying element.',
                    column: selector.start.column,
                    line: selector.start.line
                };

                break;
            case 'id':
                if (config.qualifyingElement.allowWithId) {
                    return;
                }

                error = {
                    message: 'ID selectors should not include a qualifying element.',
                    column: selector.start.column,
                    line: selector.start.line
                };

                break;
        }
    });

    if (error.message) {
        return {
            column: error.column,
            file: filename,
            line: error.line,
            linter: 'qualifyingElement',
            message: error.message
        };
    }

    return null;
};
