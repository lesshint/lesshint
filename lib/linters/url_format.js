'use strict';

var helpers = require('../helpers');
var util = require('util');

module.exports = {
    name: 'urlFormat',
    nodeTypes: ['decl'],
    message: 'URL "%s" should be %s.',

    lint: function urlFormatLinter (config, decl) {

        var parser = require('postcss-values-parser');
        var ast = parser(decl.params || decl.value).parse();
        var style = {
            absolute: helpers.isAbsoluteURL,
            relative: function (url) {
                return !helpers.isAbsoluteURL(url);
            }
        };
        var uri = ast.first.first;
        var column;

        if (config.style && !style[config.style]) {
            throw new Error('Invalid setting value for urlFormat: ' + config.style);
        }

        if (uri.type !== 'func' || uri.value !== 'url') {
            return;
        }

        uri = uri.first.next();

        if (!style[config.style](uri.value)) {

            column = (decl.raws.between ? decl.raws.between.length : 0) +
                     decl.source.start.column +
                     decl.prop.length +
                     uri.source.start.column - 1;

            return [{
                column: column,
                line: decl.source.start.line,
                message: util.format(this.message, uri.value, config.style)
            }];
        }
    }
};
