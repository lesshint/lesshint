'use strict';

var findIndex = require('lodash.findindex');

module.exports = {
    name: 'trailingSemicolon',
    nodeTypes: ['block'],
    message: 'All property declarations should end with a semicolon.',

    lint: function trailingSemicolonLinter (config, node) {
        var checkIndex;
        var start;

        // Find declarations
        checkIndex = findIndex(node.content, function (element) {
            return element.type === 'declaration';
        });

        if (checkIndex !== -1 && !node.first('declarationDelimiter')) {
            start = node.last().start;

            return [{
                column: start.column,
                line: start.line,
                message: this.message
            }];
        }
    }
};
