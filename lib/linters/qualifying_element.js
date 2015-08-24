'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var result = {};

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

                result = {
                    message: 'Attribute selectors should not include a qualifying element.',
                    column: selector.start.column,
                    line: selector.start.line
                };

                break;
            case 'class':
                if (config.qualifyingElement.allowWithClass) {
                    return;
                }

                result = {
                    message: 'Class selectors should not include a qualifying element.',
                    column: selector.start.column,
                    line: selector.start.line
                };

                break;
            case 'id':
                if (config.qualifyingElement.allowWithId) {
                    return;
                }

                result = {
                    message: 'ID selectors should not include a qualifying element.',
                    column: selector.start.column,
                    line: selector.start.line
                };

                break;
        }
    });

    if (result.message) {
        return {
            column: result.column,
            line: result.line,
            linter: 'qualifyingElement',
            message: result.message
        };
    }

    return null;
};
