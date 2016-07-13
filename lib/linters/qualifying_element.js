'use strict';

var parser = require('postcss-selector-parser');
var util = require('util');

module.exports = {
    name: 'qualifyingElement',
    nodeTypes: ['rule'],
    message: '%s selectors should not include a qualifying element.',

    inspectParent: function (node) {
        var parent = node.parent;
        var result = {
            startsWith: '',
            endsWith: '',
            hasTag: false
        };

        if (!parent || !parent.selectorAst) {
            return result;
        }

        parent.selectorAst.each(function (selector) {
            if (!result.startsWith) {
                result.startsWith = selector.first.type;
            }

            result.endsWith = selector.last.type;

            if (!result.hasTag) {
                selector.nodes.forEach(function (element) {
                    if (element.type === 'tag') {
                        result.hasTag = true;
                    }
                });
            }
        });

        return result;
    },

    lint: function qualifyingElementLinter (config, node) {
        var selectorTypes = ['nesting', 'tag'];
        var results = [];
        var self = this;

        parser(function (selectors) {
            node.selectorAst = selectors;

            selectors.each(function (selector) {
                var result;

                selector.nodes.forEach(function (element, index) {
                    var next;
                    var parent;

                    if (selectorTypes.indexOf(element.type) === -1) {
                        return;
                    }

                    // Fetch the next node to check it
                    next = selector.at(index + 1);

                    if (!next) {
                        return;
                    }

                    parent = self.inspectParent(node);

                    switch (next.type) {
                        case 'attribute':
                            if (config.allowWithAttribute) {
                                return;
                            }

                            result = next;
                            break;
                        case 'class':
                            if (config.allowWithClass ||
                               (parent.startsWith === 'class' && !parent.hasTag)) {
                                return;
                            }

                            result = next;
                            break;
                        case 'id':
                            if (config.allowWithId) {
                                return;
                            }

                            result = next;
                            break;
                    }

                    if (result) {
                        results.push({
                            column: node.source.start.column + result.source.start.column - 1,
                            line: node.source.start.line + result.source.start.line - 1,
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
