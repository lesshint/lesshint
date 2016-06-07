'use strict';

var parser = require('postcss-selector-parser');
var util = require('util');

module.exports = {
    name: 'selectorNaming',
    nodeTypes: ['rule'],
    message: 'Selector "%s" should follow naming conventions.',

    lint: function selectorNamingLinter (config, node) {
        var selectorTypes = ['class', 'id'];
        var exclude = config.exclude;
        var results = [];
        var self = this;

        parser(function (selectors) {
            selectors.walk(function (selector) {
                var name = selector.value;

                if (selectorTypes.indexOf(selector.type) === -1) {
                    return;
                }

                if (exclude && exclude.indexOf(name) !== -1) {
                    return;
                }

                if (
                    (config.disallowUppercase && name.toLowerCase() !== name) ||
                    (config.disallowUnderscore && name.indexOf('_') !== -1) ||
                    (config.disallowDash && name.indexOf('-') !== -1)
                ) {
                    results.push({
                        column: node.source.start.column + selector.source.start.column - 1,
                        line: node.source.start.line,
                        message: util.format(self.message, name)
                    });
                }
            });
        }).process(node.selector);

        if (results.length) {
            return results;
        }
    }
};
