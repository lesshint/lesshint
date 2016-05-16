'use strict';

var util = require('util');

module.exports = {
    name: 'hexValidation',
    nodeTypes: ['decl'],
    message: 'Hexadecimal color "%s" should be either three or six characters long.',

    lint: function hexValidationLinter (config, node) {
        var results = [];
        var parser = require('postcss-values-parser');
        var ast;
        var rHex = /^#([0-9a-f]+)(;?)$/i;
        var rColor = /^(#([0-9a-f]{3}|[0-9a-f]{6}))(;?)$/i;
        var self = this;

        // just in case, since postcss will sometimes include the semicolon
        // in declaration values
        node.value = node.value.replace(/;$/, '');

        ast = parser(node.value).parse();

        ast.first.walk(function (node) {
            if (node.type !== 'word') {
                return;
            }

            if (rHex.test(node.value) && !rColor.test(node.value)) {
                results.push({
                    message: util.format(self.message, node.value)
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
