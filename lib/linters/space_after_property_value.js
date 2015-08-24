'use strict';

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];

    // Bail if the linter isn't wanted
    if (!config.spaceAfterPropertyValue || (config.spaceAfterPropertyValue && !config.spaceAfterPropertyValue.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'block') {
        return null;
    }

    node.forEach('declarationDelimiter', function (element, index) {
        var maybeSpace = node.get(index - 1);

        switch (config.spaceAfterPropertyValue.style) {
            case 'no_space':
                if (maybeSpace.type === 'space') {
                    results.push({
                        column: maybeSpace.start.column,
                        line: maybeSpace.start.line,
                        message: 'Semicolon after property value should not be preceded by any space.'
                    });
                }

                break;
            case 'one_space':
                if (maybeSpace.type !== 'space' || (maybeSpace.type === 'space' && maybeSpace.content !== ' ')) {
                    results.push({
                        column: maybeSpace.start.column,
                        line: maybeSpace.start.line,
                        message: 'Semicolon after property value should be preceded by one space.'
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
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'spaceAfterPropertyValue',
                message: result.message
            };
        });
    }

    return null;
};
