'use strict';

var util = require('util');

module.exports = {
    name: 'hexValidation',
    nodeTypes: ['decl'],
    message: 'Hexadecimal color "%s" should be either three or six characters long.',

    lint: function hexValidationLinter (config, node) {
        var results = [];
        var parse = require('postcss-value-parser');
        var tree = parse(node.value);
        var rHex = /^#([0-9a-f]+)(;?)$/i;
        var rColor = /^(#([0-9a-f]{3}|[0-9a-f]{6}))(;?)$/i;
        var self = this;

        tree.nodes.forEach(function (part) {
            if (part.type !== 'word') {
                return;
            }

            // just in case, since postcss-value-parser sometimes includes them
            // tracking on https://github.com/TrySound/postcss-value-parser/issues/27
            part.value = part.value.replace(';', '');

            if (rHex.test(part.value) && !rColor.test(part.value)) {
                results.push({
                    message: util.format(self.message, part.value)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
