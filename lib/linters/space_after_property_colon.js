'use strict';

var findIndex = require('lodash.findindex');
var util = require('util');

module.exports = {
    name: 'spaceAfterPropertyColon',
    nodeTypes: ['declaration'],
    message: {
        noSpace: 'Colon after property name should not be followed by any spaces.',
        oneSpace: 'Colon after property name should be followed by one space.',
        atLeastOneSpace: 'Colon after property name should be followed by at least one space.'
    },

    lint: function spaceAfterPropertyColonLinter (config, node) {
        var style = config.style;
        var valid = true;
        var checkIndex;
        var maybeSpace;
        var message;

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

                message = this.message.noSpace;

                break;
            case 'one_space':
                if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                    valid = false;
                }

                message = this.message.oneSpace;

                break;
            case 'at_least_one_space':
                if (maybeSpace.type !== 'space') {
                    valid = false;
                }

                message = this.message.atLeastOneSpace;

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
                message: util.format(message)
            }];
        }
    }
};
