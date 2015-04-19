'use strict';

var path = require('path');
var findIndex = require('lodash.findindex');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var checkIndex;
    var maybeSpace;
    var message;

    // Bail if the linter isn't wanted
    if (config.spaceAfterPropertyColon && !config.spaceAfterPropertyColon.enabled) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'declaration') {
        return null;
    }

    // Find the colon
    checkIndex = findIndex(node.content, function (element) {
        if (element.type === 'propertyDelimiter' && element.content === ':') {
            return true;
        }

        return false;
    });

    // No colon found, bail
    if (checkIndex === -1) {
        return null;
    }

    maybeSpace = node.content[checkIndex + 1];
    switch (config.spaceAfterPropertyColon.style) {
        case 'no_space':
            if (maybeSpace.type === 'space') {
                message = 'Colon after property shouldn\'t be followed by any spaces.';
            }

            break;
        case 'one_space':
            if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                message = 'Colon after property should be followed by one space.';
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

    return true;
};
