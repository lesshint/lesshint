'use strict';

var util = require('util');

module.exports = {
    name: 'spaceAfterPropertyValue',
    nodeTypes: ['decl'],
    message: 'Semicolon after property value should%s be preceded by %s space.',

    lint: function spaceAfterPropertyValueLinter (config, node) {
        var results = [];
        var self = this;

        switch (config.style) {
            case 'no_space':
                if (node.raws.value && /.*\s$/.test(node.raws.value.raw)) {
                    results.push({
                        column: node.source.start.column + node.prop.length + node.raws.between.length + node.value.length,
                        line: node.source.end.line,
                        message: util.format(self.message, ' not', 'any')
                    });
                }

                break;
            case 'one_space':
                if (!node.raws.value) {
                    results.push({
                        column: node.source.start.column + node.prop.length + node.raws.between.length + node.value.length,
                        line: node.source.end.line,
                        message: util.format(self.message, '', 'one')
                    });
                }

                break;
            default:
                throw new Error('Invalid setting value for spaceAfterPropertyValue: ' + config.style);
        }

        if (results.length) {
            return results;
        }
    }
};
