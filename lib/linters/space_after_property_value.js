'use strict';

module.exports = {

    name: 'spaceAfterPropertyValue',
    nodeTypes: ['block'],
    message: 'Semicolon after property value should%s be preceded by %s space.',

    lint: function spaceAfterPropertyValueLinter (config, node) {
        var results = [];
        var sprintf = require('sprintf-js').sprintf;
        var self = this;

        node.forEach('declarationDelimiter', function (element, index) {
            var maybeSpace = node.get(index - 1);

            switch (config.spaceAfterPropertyValue.style) {
                case 'no_space':
                    if (maybeSpace.type === 'space') {
                        results.push({
                            column: maybeSpace.start.column,
                            line: maybeSpace.start.line,
                            message: sprintf(self.message, ' not', 'any')
                        });
                    }

                    break;
                case 'one_space':
                    if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                        results.push({
                            column: maybeSpace.start.column,
                            line: maybeSpace.start.line,
                            message: sprintf(self.message, '', 'one')
                        });
                    }

                    break;
                default:
                    throw new Error(
                        'Invalid setting value for spaceAfterPropertyValue: ' + config.spaceAfterPropertyValue.style
                    );
            }
        });

        if (results.length) {
            return results;
        }
    }
};
