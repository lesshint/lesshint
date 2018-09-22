'use strict';

const parseSelector = require('../utils/parse-selector');
const util = require('util');

module.exports = {
    name: 'selectorNaming',
    nodeTypes: ['rule'],
    message: 'Selector "%s" should follow naming conventions.',

    lint: function selectorNamingLinter (config, node) {
        const selectors = parseSelector(node);
        const selectorTypes = ['class', 'id'];
        const exclude = config.exclude || [];
        const results = [];

        selectors.walk((selector) => {
            if (!selectorTypes.includes(selector.type)) {
                return;
            }

            const name = selector.value;

            if (exclude.includes(name)) {
                return;
            }

            if (
                (config.disallowUppercase && name.toLowerCase() !== name) ||
                (config.disallowUnderscore && name.includes('_')) ||
                (config.disallowDash && name.includes('-'))
            ) {
                const { column, line } = node.positionBy({
                    word: selector.toString().trim()
                });

                results.push({
                    column,
                    line,
                    message: util.format(this.message, name)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
