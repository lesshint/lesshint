'use strict';

const util = require('util');

module.exports = {
    name: 'maxCharPerLine',
    nodeTypes: ['root'],
    message: 'Line should not exceed %d characters, %d found.',

    lint: function maxCharPerLineLinter (config, node) {
        const lines = node.source.input.css.split('\n');
        const results = [];

        lines.forEach((line, index) => {
            const charCount = line.length;

            if (charCount > config.limit) {
                results.push({
                    column: 0,
                    line: index + 1,
                    message: util.format(this.message, config.limit, charCount)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
