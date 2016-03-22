'use strict';

var util = require('util');

module.exports = {
    name: 'hexNotation',
    nodeTypes: ['decl'],
    message: '%s should be written in %s.',

    lint: function hexNotationLinter (config, node) {

        var results = [];
        var parse = require('postcss-value-parser');
        var tree = parse(node.value);
        var styles = {
            lowercase: /^#[0-9a-z]+$/,
            uppercase: /^#[0-9A-Z]+$/
        };
        var color;
        var self = this;

        if (config.style && !styles[config.style]) {
            throw new Error('Invalid setting value for hexNotation: ' + config.style);
        }

        tree.nodes.forEach(function (part) {
            if (part.type !== 'word' || !/^#/.test(part.value)) {
                return;
            }

            // just in case, since postcss-value-parser sometimes includes them
            // tracking on https://github.com/TrySound/postcss-value-parser/issues/27
            part.value = part.value.replace(';', '');
            color = part.value;

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
