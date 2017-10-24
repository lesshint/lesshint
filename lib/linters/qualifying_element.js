'use strict';

const parseSelector = require('../utils/parse-selector');
const util = require('util');

module.exports = {
    name: 'qualifyingElement',
    nodeTypes: ['rule'],
    message: '%s selectors should not include a qualifying element.',

    inspectParent: function (node) {
        const parent = node.parent;
        const result = {
            startsWith: '',
            endsWith: '',
            hasTag: false
        };

        if (!parent || !parent.selectorAst) {
            return result;
        }

        parent.selectorAst.each((selector) => {
            if (!result.startsWith) {
                result.startsWith = selector.first.type;
            }

            result.endsWith = selector.last.type;

            if (!result.hasTag) {
                selector.nodes.forEach((element) => {
                    if (element.type === 'tag') {
                        result.hasTag = true;
                    }
                });
            }
        });

        return result;
    },

    lint: function qualifyingElementLinter (config, node) {
        const selectors = parseSelector(node);
        const selectorTypes = ['nesting', 'tag'];
        const results = [];

        node.selectorAst = selectors;

        selectors.each((selector) => {
            let result;

            selector.nodes.forEach((element, index) => {
                if (selectorTypes.indexOf(element.type) === -1) {
                    return;
                }

                // Fetch the next node to check it
                const next = selector.at(index + 1);

                if (!next) {
                    return;
                }

                const parent = this.inspectParent(node);

                switch (next.type) {
                    case 'attribute':
                        if (config.allowWithAttribute) {
                            return;
                        }

                        result = next;

                        break;
                    case 'class':
                        if (config.allowWithClass || (parent.startsWith === 'class' && !parent.hasTag)) {
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
                    const position = node.positionBy({
                        word: result.toString().trim()
                    });

                    results.push({
                        column: position.column,
                        line: position.line,
                        message: util.format(this.message, result.type.charAt(0).toUpperCase() + result.type.substring(1))
                    });
                }
            });
        });

        if (results.length) {
            return results;
        }
    }
};
