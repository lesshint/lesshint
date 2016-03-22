'use strict';

var helpers = require('../helpers');
var util = require('util');

module.exports = {
    name: 'urlFormat',
    nodeTypes: ['decl'],
    message: 'URL "%s" should be %s.',

    lint: function urlFormatLinter (config, node) {

        var parse = require('postcss-value-parser');
        var tree = parse(node.params || node.value);
        var first = tree.nodes[0];
        var style = {
            absolute: helpers.isAbsoluteURL,
            relative: function (url) {
                return !helpers.isAbsoluteURL(url);
            }
        };
        var uri;

        if (config.style && !style[config.style]) {
            throw new Error('Invalid setting value for urlFormat: ' + config.style);
        }

        if (first.type !== 'function' || first.value !== 'url') {
            return;
        }

        uri = first.nodes[0];

        if (!style[config.style](uri.value)) {
            // column numbers are gonna be jacked up here for a bit
            // postcss-value-parser doesn't have the same source values
            // that postcss nodes have.
            // tracking: https://github.com/TrySound/postcss-value-parser/issues/26
            return [{
                column: node.source.start.column,
                line: node.source.start.line,
                message: util.format(this.message, uri.value, config.style)
            }];
        }

        // var valid = true;
        // var value;
        // var url;
        //
        // node.forEach('value', function (element) {
        //     value = element.first('uri');
        // });
        //
        // // No URLs found, bail
        // if (!value) {
        //     return null;
        // }
        //
        // url = value.first('string') || value.first('raw');
        // url = url.content.replace(/['"]/g, '');
        //
        // switch (config.style) {
        //     case 'absolute':
        //         if (!helpers.isAbsoluteURL(url)) {
        //             valid = false;
        //         }
        //
        //         break;
        //     case 'relative':
        //         if (helpers.isAbsoluteURL(url)) {
        //             valid = false;
        //         }
        //
        //         break;
        //     default:
        //         throw new Error(
        //
        //         );
        // }
        //
        // if (!valid) {
        //     return [{
        //         column: value.start.column,
        //         line: value.start.line,
        //         message: util.format(this.message, url, config.style)
        //     }];
        // }
    }
};
