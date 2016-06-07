'use strict';

var util = require('util');

module.exports = {
    name: 'hexLength',
    nodeTypes: ['decl'],
    message: '%s should be written in the %s-form format.',

    lint: function hexLengthLinter (config, node) {

        var results = [];
        var parser = require('postcss-values-parser');
        var ast;
        var self = this;

        // just in case, since postcss will sometimes include the semicolon
        // in declaration values
        node.value = node.value.replace(/;$/, '');

        ast = parser(node.value).parse();

        ast.first.walk(function (child) {
            var color;
            var canShorten = false;
            var valid = true;

            if (child.type !== 'word' || !child.isColor) {
                return;
            }

            color = child.value;

            switch (config.style) {
                case 'long':
                    if (color.length === 4 && !/^#[0-9a-f]{6}$/i.test(color)) {
                        valid = false;
                    }

                    break;
                case 'short':
                    // We want to allow longhand form on hex values that can't be shortened
                    if (color.length === 7) {
                        canShorten = (color[1] === color[2] && color[3] === color[4] && color[5] === color[6]);

                        if (!/^#[0-9a-f]{3}$/i.test(color) && canShorten) {
                            valid = false;
                        }
                    }

                    break;
                default:
                    throw new Error(
                        'Invalid setting value for hexLength: ' + config.style
                    );
            }

            if (!valid) {
                results.push({
                    column: node.source.start.column + node.prop.length + node.raws.between.length + child.source.start.column - 1,
                    message: util.format(self.message, color, config.style)
                });
            }

        });

        if (results.length) {
            return results;
        }
    }
};
