'use strict';

var util = require('util');

module.exports = {
    name: 'stringQuotes',
    nodeTypes: ['stylesheet'],
    message: 'Strings should use %s quotes.',

    lint: function stringQuotesLinter (config, node) {
        var results = [];
        var self = this;

        node.traverse(function (element) {
            var valid = true;

            if (element.type !== 'string') {
                return;
            }

            switch (config.style) {
                case 'double':
                    if (!/".*"/.test(element.content)) {
                        valid = false;
                    }

                    break;
                case 'single':
                    if (!/'.*'/.test(element.content)) {
                        valid = false;
                    }

                    break;
                default:
                    throw new Error(
                        'Invalid setting value for stringQuotes: ' + config.style
                    );
            }

            if (!valid) {
                results.push({
                    column: element.start.column,
                    line: element.start.line,
                    message: util.format(self.message, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
