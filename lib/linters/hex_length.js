'use strict';

var util = require('util');

module.exports = {
    name: 'hexLength',
    nodeTypes: ['decl'],
    message: '%s should be written in the %s-form format.',

    lint: function hexLengthLinter (config, node) {

        var results = [];
        var parse = require('postcss-value-parser');
        var tree = parse(node.value);
        var self = this;

        tree.nodes.forEach(function (part) {
            var color;
            var canShorten = false;
            var valid = true;

            if (part.type !== 'word') {
                return;
            }

            // just in case, since postcss-value-parser sometimes includes them
            // tracking on https://github.com/TrySound/postcss-value-parser/issues/27
            part.value = part.value.replace(';', '');
            color = part.value;

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
                    message: util.format(self.message, color, config.style)
                });
            }

        });

        if (results.length) {
            return results;
        }
    }
};
