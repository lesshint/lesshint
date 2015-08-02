'use strict';

var findIndex = require('lodash.findindex');

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var checkIndex;
    var maybeSpace;
    var message;

    // Bail if the linter isn't wanted
    if (!config.spaceAfterPropertyName || (config.spaceAfterPropertyName && !config.spaceAfterPropertyName.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    // Find the colon
    checkIndex = findIndex(node.content, function (element) {
        return (element.type === 'property');
    });

    maybeSpace = node.content[checkIndex + 1];
    switch (config.spaceAfterPropertyName.style) {
        case 'no_space':
            if (maybeSpace.type === 'space') {
                message = 'Colon after property should not be preceded by any space.';
            }

            break;
        case 'one_space':
            if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                message = 'Colon after property should be preceded by one space.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for spaceAfterPropertyName: ' + config.spaceAfterPropertyName.style
            );
    }

    if (message) {
        return {
            column: maybeSpace.start.column,
            line: maybeSpace.start.line,
            linter: 'spaceAfterPropertyName',
            message: message
        };
    }

    return null;
};
