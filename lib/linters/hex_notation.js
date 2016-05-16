'use strict';

var util = require('util');

module.exports = {
    name: 'hexNotation',
    nodeTypes: ['decl'],
    message: '%s should be written in %s.',

    lint: function hexNotationLinter (config, node) {

        var results = [];
        var parser = require('postcss-values-parser');
        var ast;
        var styles = {
            lowercase: /^#[0-9a-z]+$/,
            uppercase: /^#[0-9A-Z]+$/
        };
        var color;
        var self = this;

        // just in case, since postcss will sometimes include the semicolon
        // in declaration values
        node.value = node.value.replace(/;$/, '');

        ast = parser(node.value).parse();

        if (config.style && !styles[config.style]) {
            throw new Error('Invalid setting value for hexNotation: ' + config.style);
        }

        ast.first.walk(function (node) {
            if (node.type !== 'word' || !/^#/.test(node.value)) {
                return;
            }

            color = node.value;

            if (/^#\d+$/.test(color)) {
                return;
            }

            if (!styles[config.style].test(color)) {
                results.push({
                    message: util.format(self.message, color, config.style)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
