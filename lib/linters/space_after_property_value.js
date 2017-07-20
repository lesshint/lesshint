'use strict';

const util = require('util');

module.exports = {
    name: 'spaceAfterPropertyValue',
    nodeTypes: ['decl'],
    message: 'Semicolon after property value should%s be preceded by %s space.',

    lint: function spaceAfterPropertyValueLinter (config, node) {
        const nodeString = node.toString().trimRight();
        const results = [];

        switch (config.style) {
            case 'no_space':
                if (/.*\s$/.test(node.raws.important) || node.raws.value && /.*\s$/.test(node.raws.value.raw)) {
                    const position = node.positionBy({
                        index: nodeString.length
                    });

                    results.push({
                        column: position.column,
                        line: position.line,
                        message: util.format(this.message, ' not', 'any')
                    });
                }

                break;
            case 'one_space':
                if (!/.*\s$/.test(node.raws.important) && !node.raws.value) {
                    const position = node.positionBy({
                        index: nodeString.length
                    });

                    results.push({
                        column: position.column,
                        line: position.line,
                        message: util.format(this.message, '', 'one')
                    });
                }

                break;
            default:
                throw new Error(`Invalid setting value for spaceAfterPropertyValue: ${ config.style }`);
        }

        if (results.length) {
            return results;
        }
    }
};
