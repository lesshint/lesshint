'use strict';

var util = require('util');

module.exports = {
    name: 'validateIndentation',
    nodeTypes: ['block'],
    message: {
        mixed: 'Mixed tabs and spaces.',
        style: 'Indentation should use %s.',
        unexpected: 'Expected an indentation of %d but found %d.'
    },

    lint: function validateIndentationLinter (config, node) {
        var nodeTypes = ['atrule', 'declaration', 'extend', 'mixin'];
        var result = [];
        var self = this;

        node.traverse(function (element, index, parent, level) {
            var start = element.start.column - 1;
            var line = element.start.line;
            var leading;

            if (nodeTypes.indexOf(element.type) === -1) {
                return;
            }

            // Remove new lines from leading spaces so we can check for tabs more easily
            leading = node.get(index - 1);
            leading = leading.content || '';
            leading = leading.replace('\n', '');

            // Check the style first
            if (config.style === 'tabs' && !/^\t+$/.test(leading)) {
                result.push({
                    column: 0,
                    line: element.start.line,
                    message: util.format(self.message.style, 'tabs')
                });

                return;
            } else if (config.style === 'spaces' && /^\t+$/.test(leading)) {
                result.push({
                    column: 0,
                    line: element.start.line,
                    message: util.format(self.message.style, 'spaces')
                });

                return;
            }

            // Check for mixed tabs and spaces
            if (/^[\t]+[ ]+$/.test(leading)) {
                result.push({
                    column: 0,
                    line: element.start.line,
                    message: self.message.mixed
                });

                return;
            }

            // We need to calculate the correct level ourselves since it's derived from the root node
            level = config.size * (level / 2);
            if (start !== level) {
                result.push({
                    column: 0,
                    line: element.start.line,
                    message: util.format(self.message.unexpected, level, start)
                });
            }
        });

        if (result.length) {
            return result;
        }
    }
};
