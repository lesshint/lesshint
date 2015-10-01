'use strict';

module.exports = {

    name: 'attributeQuotes',
    nodeTypes: ['simpleSelector'],
    message: 'Attribute selectors should use %s quotes.',

    lint: function attributeQuotesLinter (config, node) {
        var selector;
        var value;
        var valid = true;
        var sprintf = require('sprintf-js').sprintf;

        selector = node.first('attribute');

        // Bail if no attribute selectors are found
        // Bail if there's no value to check
        if (!selector || !selector.contains('attributeSelector')) {
            return;
        }

        // Use last ident when no quotes are present
        value = selector.first('string') || selector.last('ident');

        switch (config.attributeQuotes.style) {
            case 'double':
                if (!/".*"/.test(value.content)) {
                    valid = false;
                }

                break;
            case 'single':
                if (!/'.*'/.test(value.content)) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for attributeQuotes: ' + config.attributeQuotes.style
                );
        }

        if (!valid) {
            value = selector.last('ident');

            return [{
                column: value.start.column,
                line: value.start.line,
                message: sprintf(this.message, config.attributeQuotes.style)
            }];
        }
    }
};
