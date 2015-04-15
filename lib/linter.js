'use strict';

var fs = require('fs');
var path = require('path');
var gonzales = require('gonzales-pe');
var linters = [
    require('./linters/space_before_brace')
];

exports.lint = function lint (file, config) {
    var _this = this;

    // Load the specified LESS file and lint it!
    fs.readFile(file, 'utf8', function loadFile (err, data) {
        var ast;

        if (err) {
            throw err;
        }

        ast = _this.parseAST(data);
        ast.map(function lint (node) {
            var result;
            var i;

            for (i = 0; i < linters.length; i++) {
                result = linters[i].call(null, {
                    config: config,
                    file: path.basename(file),
                    node: node
                });
            }
        });
    });
};

exports.parseAST = function parseAST (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
