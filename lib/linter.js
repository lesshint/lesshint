'use strict';

var gonzales = require('gonzales-pe');
var linters = [
    require('./linters/space_before_brace')
];

exports.lint = function (data, config) {
    var ast = this.parseAST(data);
    var result = [];

    ast.map(function (node) {
        var i;

        for (i = 0; i < linters.length; i++) {
            result.push(linters[i].call(null, {
                config: config,
                node: node
            }));
        }
    });

    // Remove all results for nodes that were skipped or passed
    return result.filter(function (item) {
        return item !== null && item !== true;
    });
};

exports.parseAST = function (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
