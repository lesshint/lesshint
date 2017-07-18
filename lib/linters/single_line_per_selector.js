'use strict';

const parseSelector = require('../utils/parse-selector');

module.exports = {
    name: 'singleLinePerSelector',
    nodeTypes: ['rule'],
    message: 'Each selector should be on its own line.',

    lint: function singleLinePerSelectorLinter (config, node) {
        const tree = parseSelector(node);
        const results = [];

        let valid = true;

        tree.each((selector) => {
            let reported = false;

            selector.each((thing) => {
                // This selector is already reported, bail
                if (reported) {
                    return;
                }

                const value = thing.toString().trim();

                switch (config.style) {
                    case '18f':
                        if (value && value.length >= 5) {
                            valid = false;

                            return;
                        }

                        break;
                    default:
                        valid = false;

                        break;
                }

                if (!valid && tree.nodes.length > 1 && node.selector.indexOf('\n') === -1) {
                    reported = true;

                    results.push({
                        column: node.source.start.column + thing.source.start.column - 1,
                        line: node.source.start.line,
                        message: this.message
                    });
                }
            });
        });

        if (results.length) {
            return results;
        }
    }
};
