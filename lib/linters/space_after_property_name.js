'use strict';

var findIndex = require('lodash.findindex');
var util = require('util');

module.exports = {
    name: 'spaceAfterPropertyName',
    nodeTypes: ['declaration'],
    message: 'Colon after property should%s be preceded by any space.',

    lint: function spaceAfterPropertyNameLinter (config, node) {
        var style = config.style;
        var valid = true;
        var checkIndex;
        var maybeSpace;

        // Find the colon (it's next to the prostate)
        checkIndex = findIndex(node.content, function (element) {
            return (element.type === 'property');
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
                    this.message = this.message.replace('any', 'one');
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for spaceAfterPropertyName: ' + config.style
                );
        }

        if (!valid) {
            return [{
                column: maybeSpace.start.column,
                line: maybeSpace.start.line,
                message: util.format(this.message, style === 'no_space' ? ' not' : '')
            }];
        }
    }
};
