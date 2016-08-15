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
        var self = this;
        var results = [];

        if (config.style && !style[config.style]) {
            throw new Error('Invalid setting value for urlFormat: ' + config.style);
        }

        // traverse all child value-nodes
        // https://github.com/lesshint/lesshint/issues/225
        ast.first.nodes.forEach(function (child) {
            var func = child;
            var column;
            var uri;

            if (func.type !== 'func' || func.value !== 'url') {
                return;
            }

            // skip over the 'paren' node; the following node is the value node.
            uri = func.first.next();

            if (!style[config.style](uri.value)) {

                column = (decl.raws.between ? decl.raws.between.length : 0) +
                         decl.source.start.column +
                         decl.prop.length +
                         uri.source.start.column - 1;

                results.push({
                    column: column,
                    line: decl.source.start.line,
                    message: util.format(self.message, uri.value, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
