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
        var lineNumberArr = [];
        var resultSet = [];
        var i;

        for (line = 0; line < lineArray.length; line++) {
            charCount = lineArray[line].length;
            if (charCount > charLimit) {
                lineNumberArr.push({
                    lineNumber: line + 1,
                    charCount: charCount,
                });
            }
        }
        for (i = 0; i < lineNumberArr.length; i++) {
            resultSet.push({
                column: 0,
                line: lineNumberArr[i].lineNumber,
                message: util.format(this.message, charLimit, lineNumberArr[i].charCount)
            });
        }
        return (resultSet.length > 0) ? resultSet : undefined;
    }
};
