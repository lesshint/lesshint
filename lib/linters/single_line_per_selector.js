'use strict';

const parseSelector = require('../utils/parse-selector');
const hasNewline = require('../utils/has-newline');

module.exports = {
    name: 'singleLinePerSelector',
    nodeTypes: ['rule'],
    message: 'Each selector should be on its own line.',

    lint: function singleLinePerSelectorLinter (config, node) {
        const selectors = parseSelector(node.selector);
        const results = [];

        // Just one selector, so nothing to check
        if (selectors.length === 1) {
            return;
        }

        let longest = 0;

        selectors.each((selector) => {
            selector.each((child) => {
                const value = child.toString().trim();
                const { length } = value;

                if (length > longest) {
                    longest = length;
                }

                /**
                 * Ignore 18f style selectors (length less than 5 chars)
                 * but only when all selectors are less than 5 chars
                 */
                if (config.style === '18f' && length < 5 && longest < 5) {
                    return true;
                }

                const {before} = selector.first.spaces;
                const {after} = selector.last.spaces;

                if ((before && !hasNewline(before)) || (after && !hasNewline(after))) {
                    const { column, line } = node.positionBy({
                        word: selector.toString().trim()
                    });

                    results.push({
                        column,
                        line,
                        message: this.message
                    });

                    return false;
                }

                return true;
            });
        });

        if (results.length) {
            return results;
        }
    }
};
