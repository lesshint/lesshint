'use strict';

const { stringify } = require('postcss-less');

module.exports = (node) => {
    return node.toString(stringify);
};
