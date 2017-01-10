'use strict';

module.exports = {
    name: 'spaceAfterPropertyColon',
    nodeTypes: ['decl'],
    message: {
        'no_space': 'Colon after property name should not be followed by any spaces.',
        'one_space': 'Colon after property name should be followed by one space.',
        'at_least_one_space': 'Colon after property name should be followed by at least one space.'
    },

    lint: function spaceAfterPropertyColonLinter (config, node) {
        const styles = {
            'no_space': /^\s*:$/,
            'one_space': /^\s*:\s$/,
            'at_least_one_space': /^\s*:\s{1,}$/
        };

        if (config.style && !styles[config.style]) {
            throw new Error(`Invalid setting value for spaceAfterPropertyColon: ${ config.style }`);
        }

        if (!styles[config.style].test(node.raws.between)) {
            return [{
                column: node.source.start.column + node.prop.length + node.raws.between.indexOf(':') + 1,
                line: node.source.start.line,
                message: this.message[config.style]
            }];
        }
    }
};
