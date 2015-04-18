'use strict';

var gonzales = require('gonzales-pe');
var linters = [
    require('./linters/space_before_brace')
];

exports.lint = function (input, path, config) {
    var ast = this.parseAST(input);
    var errors = [];

    ast.map(function (node) {
        var i;

        for (i = 0; i < linters.length; i++) {
            errors.push(linters[i].call(null, {
                config: config,
                node: node,
                path: path
            }));
        }
    });

    // Remove empty errors
    return errors.filter(function (error) {
        return error !== null && error !== true;
    });
};

exports.parseAST = function (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
