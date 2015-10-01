'use strict';

module.exports = {

    name: 'stringQuotes',
    nodeTypes: ['stylesheet'],
    message: 'Strings should use %s quotes.',

    lint: function stringQuotesLinter (config, node) {
        var results = [];
        var sprintf = require('sprintf-js').sprintf;
        var self = this;

        node.traverse(function (element) {
            var valid = true;

            if (element.type !== 'string') {
                return;
            }

            switch (config.stringQuotes.style) {
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
                        'Invalid setting value for stringQuotes: ' + config.stringQuotes.style
                    );
            }

            if (!valid) {
                results.push({
                    message: sprintf(self.message, config.stringQuotes.style),
                    column: element.start.column,
                    line: element.start.line
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
