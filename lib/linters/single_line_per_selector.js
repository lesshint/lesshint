'use strict';

module.exports = {
    name: 'singleLinePerSelector',
    nodeTypes: ['ruleset'],
    message: 'Each selector should be on its own line.',

    lint: function singleLinePerSelectorLinter (config, node) {
        var results = [];
        var self = this;

        node.forEach('delimiter', function (element, index) {
            element = node.get(index + 1);

            if (element.content.indexOf('\n') === -1) {
                results.push({
                    column: element.start.column,
                    line: element.start.line,
                    message: self.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
