'use strict';

var helpers = require('../helpers');
var util = require('util');

module.exports = {
    name: 'urlFormat',
    nodeTypes: ['declaration'],
    message: 'URL "%s" should be %s.',

    lint: function urlFormatLinter (config, node) {
        var valid = true;
        var value;
        var url;

        node.forEach('value', function (element) {
            value = element.first('uri');
        });

        // No URLs found, bail
        if (!value) {
            return null;
        }

        url = value.first('string') || value.first('raw');
        url = url.content.replace(/['"]/g, '');

        switch (config.style) {
            case 'absolute':
                if (!helpers.isAbsoluteURL(url)) {
                    valid = false;
                }

                break;
            case 'relative':
                if (helpers.isAbsoluteURL(url)) {
                    valid = false;
                }

                break;
            default:
                throw new Error(
                    'Invalid setting value for urlFormat: ' + config.style
                );
        }

        if (!valid) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: util.format(this.message, url, config.style)
            }];
        }
    }
};
