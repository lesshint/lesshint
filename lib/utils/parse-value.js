'use strict';

const parser = require('postcss-values-parser');

module.exports = function (value) {
    const tree = parser(value, {
        loose: true
    }).parse();

    return tree;
};
