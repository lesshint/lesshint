'use strict';

module.exports = {
    name: 'attributeQuotes',
    nodeTypes: ['attributeValue'],
    message: 'Attribute selectors should use quotes.',

    lint: function attributeQuotesLinter (config, node) {
        var value = node.first('string');

        if (!value) {
            value = node.last('ident');

            return [{
                column: value.start.column,
                line: value.start.line,
                message: this.message
            }];
        }
    }
};
