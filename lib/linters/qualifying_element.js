'use strict';

var parser = require('postcss-selector-parser');
var util = require('util');

module.exports = {
    name: 'qualifyingElement',
    nodeTypes: ['rule'],
    message: '%s selectors should not include a qualifying element.',

    lint: function qualifyingElementLinter (config, node) {
        var selectorTypes = ['nesting', 'tag'];
        var results = [];
        var self = this;

        parser(function (selectors) {
            selectors.each(function (selector) {
                var result;

                selector.nodes.forEach(function (element, index) {
                    if (selectorTypes.indexOf(element.type) === -1) {
                        return;
                    }

                    // Fetch the next node to check it
                    element = selector.at(index + 1);

                    if (!element) {
                        return;
                    }

                    switch (element.type) {
                        case 'attribute':
                            if (config.allowWithAttribute) {
                                return;
                            }

                            result = element;
                            break;
                        case 'class':
                            if (config.allowWithClass) {
                                return;
                            }

                            result = element;
                            break;
                        case 'id':
                            if (config.allowWithId) {
                                return;
                            }

                            result = element;
                            break;
                    }

                    if (result) {
                        results.push({
                            column: node.source.start.column + result.source.start.column - 1,
                            line: result.source.start.line,
                            message: util.format(self.message, result.type.charAt(0).toUpperCase() + result.type.substring(1))
                        });
                    }
                });
            });
        }).process(node.selector);

        if (results.length) {
            return results;
        }
    }
};
