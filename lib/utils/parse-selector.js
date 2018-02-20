'use strict';

const parser = require('postcss-selector-parser');

module.exports = (selector) => {
    return parser().astSync(selector);
};
