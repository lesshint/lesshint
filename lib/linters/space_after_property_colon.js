'use strict';

module.exports = {
    name: 'spaceAfterPropertyColon',
    nodeTypes: ['declaration'],
    message: {
        noSpace: 'Colon after property name should not be followed by any spaces.',
        oneSpace: 'Colon after property name should be followed by one space.'
    },

    lint: function spaceAfterPropertyColonLinter (config, node) {
        var checkIndex;
        var maybeSpace;
        var findIndex = require('lodash.findindex');
        var sprintf = require('sprintf-js').sprintf;
        var style = config.style;
        var valid = true;

        // Find the colon (south of the spleen)
        checkIndex = findIndex(node.content, function (element) {
            return (element.type === 'propertyDelimiter' && element.content === ':');
        });

        maybeSpace = node.content[checkIndex + 1];

        switch (style) {
            case 'no_space':
                if (maybeSpace.type === 'space') {
                    valid = false;
                }

                break;
            case 'one_space':
                if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for spaceAfterPropertyColon: ' + config.style
                );
        }

        if (!valid) {
            return [{
                column: maybeSpace.start.column,
                line: maybeSpace.start.line,
                message: sprintf(style === 'no_space' ? this.message.noSpace : this.message.oneSpace)
            }];
        }
    }
};
