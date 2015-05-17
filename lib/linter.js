'use strict';

var configLoader = require('./config-loader');
var flatten = require('lodash.flatten');
var gonzales = require('gonzales-pe');
var merge = require('lodash.merge');

var linters = [
    require('./linters/border_zero'),
    require('./linters/duplicate_property'),
    require('./linters/empty_rule'),
    require('./linters/final_newline'),
    require('./linters/hex_length'),
    require('./linters/hex_notation'),
    require('./linters/hex_validation'),
    require('./linters/id_selector'),
    require('./linters/important_rule'),
    require('./linters/leading_zero'),
    require('./linters/space_after_property_colon'),
    require('./linters/space_after_property_name'),
    require('./linters/space_before_brace'),
    require('./linters/string_quotes'),
    require('./linters/trailing_semicolon'),
    require('./linters/trailing_zero'),
    require('./linters/url_format'),
    require('./linters/url_quotes'),
    require('./linters/zero_unit')
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
    errors = errors.filter(function (error) {
        return error !== null && error !== true;
    });

    return flatten(errors);
};

exports.parseAST = function (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
