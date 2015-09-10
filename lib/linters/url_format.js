'use strict';

module.exports = {

    name: 'urlFormat',
    nodeTypes: ['declaration'],
    message: 'URL "%s" should be %s.',

    lint: function urlFormatLinter (config, node) {
        var valid = true;
        var value;
        var url;
        var sprintf = require('sprintf-js').sprintf;

        node.forEach('value', function (element) {
            value = element.first('uri');
        });

        // No URLs found, bail
        if (!value) {
            return null;
        }

        url = value.first('string') || value.first('raw');
        url = url.content.replace(/['"]/g, '');

        switch (config.urlFormat.style) {
            case 'absolute':
                if (!/^['"]?(?:\w+:)?\/\/['"]?/.test(url)) {
                    valid = false;
                }

                break;
            case 'relative':
                if (/^['"]?(?:\w+:)?\/\/['"]?/.test(url)) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for urlFormat: ' + config.urlFormat.style
                );
        }

        if (!valid) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: sprintf(this.message, url, config.urlFormat.style)
            }];
        }
    }
};
