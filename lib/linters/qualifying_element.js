'use strict';

module.exports = {

    name: 'qualifyingElement',
    nodeTypes: ['simpleSelector'],
    message: '%s selectors should not include a qualifying element.',

    lint: function qualifyingElementLinter (config, node) {
        var result;
        var helpers = require('../helpers');
        var sprintf = require('sprintf-js').sprintf;

        node.forEach(function (selector, index) {
            var content = helpers.ensureObject(node.get(index - 1));

            if (content.type !== 'ident') {
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
