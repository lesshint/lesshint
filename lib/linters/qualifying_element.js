'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var errors = [];

    // Bail if the linter isn't wanted
    if (!config.qualifyingElement || (config.qualifyingElement && !config.qualifyingElement.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'selector') {
        return null;
    }

    node.forEach('simpleSelector', function (simpleSelector) {
        simpleSelector.content.forEach(function (selector, index) {
            if (!simpleSelector.content[index - 1] || simpleSelector.content[index - 1].type !== 'ident') {
                return;
            }

            switch (selector.type) {
                case 'attribute':
                    if (config.qualifyingElement.allowWithAttribute) {
                        return;
                    }

                    errors.push({
                        message: 'Attribute selectors should not include a qualifying element.',
                        column: selector.start.column,
                        line: selector.start.line
                    });

                    break;
                case 'class':
                    if (config.qualifyingElement.allowWithClass) {
                        return;
                    }

                    errors.push({
                        message: 'Class selectors should not include a qualifying element.',
                        column: selector.start.column,
                        line: selector.start.line
                    });

                    break;
                case 'id':
                    if (config.qualifyingElement.allowWithId) {
                        return;
                    }

                    errors.push({
                        message: 'ID selectors should not include a qualifying element.',
                        column: selector.start.column,
                        line: selector.start.line
                    });

                    break;
            }
        });
    });

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'qualifyingElement',
                message: error.message
            };
        });
    }

    return true;
};
