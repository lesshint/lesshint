'use strict';

var parser = require('postcss-selector-parser');

module.exports = {
    name: 'attributeQuotes',
    nodeTypes: ['rule'],
    message: 'Attribute selectors should use quotes.',

    lint: function attributeQuotesLinter (config, node) {
        /**
         * Unfortunately as of 1.3.3, the parser isn't putting the quotes
         * in anything we can inspect. so a regex is what we need to use.
         */
        var regex = /^(\'|\")(.+)(\'|\")/g;
        var results = [];
        var self = this;

        if (!node.selector) {
            return;
        }

        parser(function (selectors) {
            /**
             * Version 1.3.3 of the postcss-selector-parser uses eachInside
             * while subsequent versions will use walk
             */
            selectors.eachInside(function (selector) {
                var column;
                var value;

                if (selector.type !== 'attribute') {
                    return;
                }

                value = selector.value;

                if (!value || !regex.test(value)) {
                    column = selector.source.start.column + selector.attribute.length
                             + selector.operator.length + '['.length;

                    results.push({
                        column: column,
                        line: selector.source.start.line,
                        message: self.message
                    });
                }
            });
        }).process(node.selector);

        if (results.length) {
            return results;
        }
    }
};
