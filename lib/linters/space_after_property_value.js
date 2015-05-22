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
    if (!config.spaceAfterPropertyValue || (config.spaceAfterPropertyValue && !config.spaceAfterPropertyValue.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'block') {
        return null;
    }

    // Find the colon
    checkIndex = findIndex(node.content, function (element) {
        if (element.type === 'declarationDelimiter') {
            return true;
        }

        return false;
    });

    // No colon found, bail
    if (checkIndex === -1) {
        return null;
    }

    maybeSpace = node.content[checkIndex - 1];
    switch (config.spaceAfterPropertyValue.style) {
        case 'no_space':
            if (maybeSpace.type === 'space') {
                message = 'Semicolon after property value should not be preceded by any space.';
            }

            break;
        case 'one_space':
            if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                message = 'Semicolon after property value should be preceded by one space.';
            }

            break;
        default:
            throw new Error(
                'Invalid setting value for spaceAfterPropertyValue: ' + config.spaceAfterPropertyValue.style
            );
    }

    if (message) {
        return {
            column: maybeSpace.start.column,
            file: filename,
            line: maybeSpace.start.line,
            linter: 'spaceAfterPropertyValue',
            message: message
        };
    }

    return true;
};
