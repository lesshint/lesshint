'use strict';

var helpers = require('../helpers');

module.exports = {
    name: 'singleLinePerSelector',
    nodeTypes: ['ruleset'],
    message: 'Each selector should be on its own line.',

    lint: function singleLinePerSelectorLinter (config, node) {
        var report = false;
        var results = [];
        var self = this;

        node.forEach('delimiter', function (element, index) {
            element = helpers.ensureObject(node.get(index + 1));

            // Check if the delimiter is on the next line
            if (element.type !== 'space') {
                element = helpers.ensureObject(node.get(index - 1));
            }

            switch (config.style) {
                case '18f':
                    node.forEach('selector', function (selector) {
                        selector = helpers.ensureObject(selector.first().first('ident'));
                        selector = selector.content;

                        if (selector && selector.length >= 5) {
                            report = true;
                            return;
                        }
                    });

                    break;
                default:
                    report = true;

                    break;
            }

            if (report && element.content.indexOf('\n') === -1) {
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
