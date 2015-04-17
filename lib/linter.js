'use strict';

var gonzales = require('gonzales-pe');
var linters = [
    require('./linters/space_before_brace')
];

exports.lint = function (data, config) {
    var ast = this.parseAST(data);
    var result;

    ast.map(function (node) {
        var i;

        for (i = 0; i < linters.length; i++) {
            result = linters[i].call(null, {
                config: config,
                node: node
            });
        }
    });

    return result;
};

exports.parseAST = function (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
