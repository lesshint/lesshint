'use strict';

var parser = require('postcss-selector-parser');

module.exports = {
    name: 'attributeQuotes',
    nodeTypes: ['rule'],
    message: 'Attribute selectors should use quotes.',

    lint: function attributeQuotesLinter (config, node) {

        var attribute;
        var selector;
        var value;
        var column;

        // unfortunately as of 1.3.3, the parser isn't putting the quotes
        // in anything we can inspect. so a regex is what we need to use.
        var regex = /^(\'|\")(.+)(\'|\")/g;

        if (!node.selector) {
            return;
        }

        parser(function (selectors) {
            selector = selectors.first;
        }).process(node.selector);

        // version 1.3.3 of the postcss-selector-parser uses eachAttribute
        // while subsequent versions will use walkAttributes
        selector.eachAttribute(function (attr) {
            attribute = attr;
            value = attribute.value;
            return false;
        });

        if (!value || !regex.test(value)) {

            column = attribute.source.start.column + attribute.attribute.length
                     + attribute.operator.length + '['.length;

            return [{
                column: column,
                line: attribute.source.start.line,
                message: this.message
            }];
        }
    }
};
