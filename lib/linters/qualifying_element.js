'use strict';

module.exports = {

    name: 'qualifyingElement',
    nodeTypes: ['simpleSelector'],
    message: '%s selectors should not include a qualifying element.',

    lint: function qualifyingElementLinter (config, node) {
        var result;
        var sprintf = require('sprintf-js').sprintf;

        node.content.forEach(function (selector, index) {
            if (!node.content[index - 1] || node.content[index - 1].type !== 'ident') {
                return;
            }

            switch (selector.type) {
                case 'attribute':
                    if (config.qualifyingElement.allowWithAttribute) {
                        return;
                    }

                    result = selector;
                    break;
                case 'class':
                    if (config.qualifyingElement.allowWithClass) {
                        return;
                    }

                    result = selector;
                    break;
                case 'id':
                    if (config.qualifyingElement.allowWithId) {
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
