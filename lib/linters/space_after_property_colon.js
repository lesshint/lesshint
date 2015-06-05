'use strict';

var findIndex = require('lodash.findindex');
var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var checkIndex;
    var maybeSpace;
    var message;

    // Bail if the linter isn't wanted
    if (!config.spaceAfterPropertyColon || (config.spaceAfterPropertyColon && !config.spaceAfterPropertyColon.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    // Find the colon
    checkIndex = findIndex(node.content, function (element) {
        return (element.type === 'propertyDelimiter' && element.content === ':');
    });

    maybeSpace = node.content[checkIndex + 1];
    switch (config.spaceAfterPropertyColon.style) {
        case 'no_space':
            if (maybeSpace && maybeSpace.type === 'space') {
                message = 'Colon after property name should not be followed by any spaces.';
            }

            break;
        case 'one_space':
            if (maybeSpace && (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' '))) {
                message = 'Colon after property name should be followed by one space.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for spaceAfterPropertyColon: ' + config.spaceAfterPropertyColon.style
            );
    }

    if (message) {
        return {
            column: maybeSpace.start.column,
            file: filename,
            line: maybeSpace.start.line,
            linter: 'spaceAfterPropertyColon',
            message: message
        };
    }

    return null;
};
