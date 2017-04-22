'use strict';

const parser = require('postcss-selector-parser');

module.exports = function (selector) {
    let tree;

    parser((selectors) => {
        tree = selectors;
    })
    .process(selector);

    return tree;
};
