'use strict';

var configLoader = require('./config-loader');
var gonzales = require('gonzales-pe');
var merge = require('lodash.merge');

var linters = [
    require('./linters/border_zero'),
    require('./linters/hex_length'),
    require('./linters/hex_notation'),
    require('./linters/hex_validation'),
    require('./linters/space_after_property_colon'),
    require('./linters/space_before_brace')
];

exports.lint = function (input, path, config) {
    var defaultConfig = configLoader(__dirname + '/config/defaults.json');
    var ast = this.parseAST(input);
    var errors = [];

    config = merge(defaultConfig, config);

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
