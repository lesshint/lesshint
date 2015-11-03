'use strict';

module.exports = {
    name: 'qualifyingElement',
    nodeTypes: ['selector'],
    message: '%s selectors should not include a qualifying element.',

    lint: function qualifyingElementLinter (config, node) {
        var result;
        var helpers = require('../helpers');
        var sprintf = require('sprintf-js').sprintf;

        node.forEach('typeSelector', function (selector, index) {
            selector = helpers.ensureObject(node.get(index + 1));

            switch (selector.type) {
                case 'attributeSelector':
                    if (config.allowWithAttribute) {
                        return;
                    }

                    result = selector;
                    result.type = 'attribute'; // Special case because of node type
                    break;
                case 'class':
                    if (config.allowWithClass) {
                        return;
                    }

                    result = selector;
                    break;
                case 'id':
                    if (config.allowWithId) {
                        return;
                    }

                    result = selector;
                    break;
            }
        });

        if (result) {
            return [{
                column: result.start.column,
                line: result.start.line,
                message: sprintf(this.message, result.type.charAt(0).toUpperCase() + result.type.substring(1))
            }];
        }
    }
};
