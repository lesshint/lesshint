'use strict';

module.exports = {
    name: 'urlQuotes',
    nodeTypes: ['declaration', 'atrule'],
    message: 'URLs should be enclosed in quotes.',

    lint: function urlQuotesLinter (config, node) {
        var value;
        var url;

        if (node.is('declaration')) {
            node.forEach('value', function (element) {
                value = element.first('uri');
            });
        } else if (node.is('atrule')) {
            value = node.first('uri');
        }

        // No URLs found, bail
        if (!value) {
            return null;
        }

        url = value.first('string');

        if (!url) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: this.message
            }];
        }
    }
};
