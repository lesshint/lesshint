'use strict';

module.exports = {
    name: 'spaceAfterComma',
    nodeTypes: ['arguments', 'parentheses'],
    message: 'Commas should%s be followed by %s space.',

    lint: function spaceAfterCommaLinter (config, node) {
        var results = [];
        var sprintf = require('sprintf-js').sprintf;
        var self = this;

        node.forEach('operator', function (element, index) {
            var start;

            if (element.content !== ',') {
                return;
            }

            element = node.content[index + 1];
            start = element.start;

            switch (config.style) {
                case 'no_space':
                    if (element.type === 'space') {
                        results.push({
                            column: start.column,
                            line: start.line,
                            message: sprintf(self.message, ' not', 'any')
                        });
                    }

                    break;
                case 'one_space':
                    if (element.type !== 'space' || element.content !== ' ') {
                        results.push({
                            column: start.column,
                            line: start.line,
                            message: sprintf(self.message, '', 'one')
                        });
                    }

                    break;
                default:
                    throw new Error(
                        'Invalid setting value for spaceAfterComma: ' + config.style
                    );
            }
        });

        if (results.length) {
            return results;
        }
    }
};
