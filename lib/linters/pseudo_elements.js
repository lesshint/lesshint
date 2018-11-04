'use strict';

const parseSelector = require('../utils/parse-selector');

const elements = [
    'after',
    'backdrop',
    'before',
    'cue',
    'first-letter',
    'first-line',
    'grammar-error',
    'marker',
    'placeholder',
    'selection',
    'slotted',
    'spelling-error',
];

module.exports = {
    name: 'pseudoElements',
    nodeTypes: ['rule'],
    message: {
        classes: 'Pseudo-classes should have 1 colon.',
        elements: 'Pseudo-elements should have 2 colons.'
    },

    lint: function pseudoElementsLinter (config, node) {
        const tree = parseSelector(node);
        const results = [];
        const exclude = config.exclude || [];

        tree.each((selector) => {
            selector.nodes.forEach((elem) => {
                if (elem.type === 'pseudo') {
                    const pseudo = elem.value.replace(/:/g, '');
                    const colons = elem.value.match(/:/g).length;
                    const { column, line } = node.positionBy({
                        word: elem
                    });

                    if (exclude.indexOf(pseudo) !== -1) {
                        return;
                    }

                    if (elements.indexOf(pseudo) !== -1) {
                        if (colons !== 2) {
                            results.push({
                                column,
                                line,
                                message: this.message.elements
                            });
                        }
                    } else if (colons !== 1) {
                        results.push({
                            column,
                            line,
                            message: this.message.classes
                        });
                    }
                }
            });
        });

        if (results.length) {
            return results;
        }
    }
};
