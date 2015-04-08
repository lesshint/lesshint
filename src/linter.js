'use strict';

var fs = require('fs');
var gonzales = require('gonzales-pe');

module.exports = {
    linters: [
        require('./linters/space_before_brace')
    ],

    lint: function lint (path, config) {
        var _this = this;

        // Load the specified LESS file and lint it!
        fs.readFile(path, 'utf8', function loadFile (err, data) {
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
                        node: node,
                        config: config
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
