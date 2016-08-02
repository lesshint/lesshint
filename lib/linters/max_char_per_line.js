'use strict';

var util = require('util');

module.exports = {
    name: 'maxCharPerLine',
    nodeTypes: ['root'],
    message: 'Line should not exceed %d characters, %d found.',

    lint: function maxCharPerLineLinter (config, node) {
        var charLimit = config.limit;
        var charCount;
        var lineArray = node.source.input.css.split('\n');
        var line;

        console.log('running max char');
        for (line = 0; line < lineArray.length; line++) {
            charCount = lineArray[line].length;
            if (charCount > charLimit) {
                return [{
                    column: 0,
                    line: line,
                    message: util.format(this.message, charLimit, charCount)
                }];
            }
        }
    }
};
