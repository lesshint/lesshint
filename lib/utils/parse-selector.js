'use strict';

const parser = require('postcss-selector-parser');

module.exports = function (selector) {
    return parser().astSync(selector);
};
