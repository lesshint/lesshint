'use strict';

var fs = require('fs');
var path = require('path');
var gonzales = require('gonzales-pe');

module.exports = {
    linters: [
        require('./linters/space_before_brace')
    ],

    lint: function lint (file, config) {
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

                for (i = 0; i < _this.linters.length; i++) {
                    result = _this.linters[i].call(null, {
                        config: config,
                        file: path.basename(file),
                        node: node
                    });
                }
            });
        });
    },

    parseAST: function parseAST (input) {
        return gonzales.parse(input, {
            syntax: 'less'
        });
    }
};
