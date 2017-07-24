'use strict';

const parser = require('postcss-values-parser');

module.exports = function (value, options) {
    const defaults = {
        loose: true
    };

    options = Object.assign(defaults, options);

    return parser(value, options).parse();
};
