'use strict';

module.exports = {
    name: 'singleLinePerSelector',
    nodeTypes: ['selector'],
    message: 'Each selector should be on its own line.',

    lint: function singleLinePerSelectorLinter (config, node) {
        var results = [];
        var self = this;

        node.forEach('simpleSelector', function (element, index) {
            /*
             * Since the new line character is emitted together with each selector following the first one
             * we'll simply ignore the first selector and just check the rest for new line characters.
             */
            if (!index) {
                return true;
            }

            if (element.get(0).content.indexOf('\n') === -1) {
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
