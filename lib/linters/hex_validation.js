'use strict';

var util = require('util');

module.exports = {
    name: 'hexValidation',
    nodeTypes: ['color'],
    message: 'Hexadecimal color "%s" should be either three or six characters long.',

    lint: function hexValidationLinter (config, node) {
        var color = '#' + node.content;

        if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
            return [{
                message: util.format(this.message, color)
            }];
        }
    }
};
