'use strict';

var util = require('util');

module.exports = {
    name: 'spaceAfterPropertyValue',
    nodeTypes: ['block'],
    message: 'Semicolon after property value should%s be preceded by %s space.',

    lint: function spaceAfterPropertyValueLinter (config, node) {
        var results = [];
        var self = this;

        node.forEach('declarationDelimiter', function (element, index) {
            var maybeSpace = node.get(index - 1);

            switch (config.style) {
                case 'no_space':
                    if (maybeSpace.type === 'space') {
                        results.push({
                            column: maybeSpace.start.column,
                            line: maybeSpace.start.line,
                            message: util.format(self.message, ' not', 'any')
                        });
                    }

                    break;
                case 'one_space':
                    if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                        results.push({
                            column: maybeSpace.start.column,
                            line: maybeSpace.start.line,
                            message: util.format(self.message, '', 'one')
                        });
                    }

                    break;
                default:
                    throw new Error(
                        'Invalid setting value for spaceAfterPropertyValue: ' + config.style
                    );
            }
        });

        if (results.length) {
            return results;
        }
    }
};
