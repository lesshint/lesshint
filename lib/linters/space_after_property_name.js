'use strict';

var util = require('util');

module.exports = {
    name: 'spaceAfterPropertyName',
    nodeTypes: ['decl'],
    message: 'Colon after property should%s be preceded by %s space.',

    lint: function spaceAfterPropertyNameLinter (config, node) {

        var styles = {
            'no_space': /^:/,
            'one_space': /^\s:/
        };

        if (config.style && !styles[config.style]) {
            throw new Error('Invalid setting value for spaceAfterPropertyName: ' + config.style);
        }

        if (!styles[config.style].test(node.raws.between)) {
            return [{
                column: node.source.start.column + node.prop.length,
                line: node.source.start.line,
                message: util.format(
                    this.message,
                    config.style === 'no_space' ? ' not' : '',
                    config.style === 'no_space' ? 'any' : 'one'
                )
            }];
        }
    }
};
