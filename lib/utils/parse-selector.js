'use strict';

const parser = require('postcss-selector-parser');

module.exports = function (selector) {
    let tree;

    parser((selectors) => {
        tree = selectors;
    }).processSync(selector);

    return tree;
};
