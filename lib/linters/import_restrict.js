'use strict';

const util = require('util');

/*
 * This rule restricts @imports which are importing from paths starting with strings specified in 'restrictPrefix' rule
 * setting and restricts the @imports which are importing from paths conatining strings specified in 'restrictPattern'
 * rule setting.
 */
module.exports = {
    name: 'importRestrict',
    nodeTypes: ['atrule'],
    message: {
        prefix: 'Imported file with path prefix "%s" is restricted.',
        pattern: 'Imported file contains "%s" which is a restricted @import path pattern.'
    },

    lint: function importRestrictLinter (config, node) {
        if (!node.import) {
            return;
        }

        const { filename } = node;
        const value = filename.trim().replace(/['"]/g, '');

        const results = [];
        const { column, line } = node.positionBy({
            word: value
        });

        if (config.restrictPrefix) {
            config.restrictPrefix.forEach((prefix) => {
                if (value.startsWith(prefix)) {
                    results.push({
                        column,
                        line,
                        message: util.format(this.message.prefix, prefix)
                    });
                }
            });
        }

        if (config.restrictPattern) {
            config.restrictPattern.forEach((pattern) => {
                if (value.includes(pattern)) {
                    results.push({
                        column,
                        line,
                        message: util.format(this.message.pattern, pattern)
                    });
                }
            });
        }

        if (results.length) {
            return results;
        }
    }
};
