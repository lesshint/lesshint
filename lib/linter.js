'use strict';

var flatten = require('lodash.flatten');
var gonzales = require('gonzales-pe');

var linters = [
    require('./linters/attribute_quotes'),
    require('./linters/border_zero'),
    require('./linters/comment'),
    require('./linters/duplicate_property'),
    require('./linters/empty_rule'),
    require('./linters/final_newline'),
    require('./linters/hex_length'),
    require('./linters/hex_notation'),
    require('./linters/hex_validation'),
    require('./linters/id_selector'),
    require('./linters/import_path'),
    require('./linters/important_rule'),
    require('./linters/leading_zero'),
    require('./linters/property_units'),
    require('./linters/qualifying_element'),
    require('./linters/single_line_per_property'),
    require('./linters/single_line_per_selector'),
    require('./linters/space_after_comma'),
    require('./linters/space_after_property_colon'),
    require('./linters/space_after_property_name'),
    require('./linters/space_after_property_value'),
    require('./linters/space_before_brace'),
    require('./linters/space_before_comma'),
    require('./linters/space_between_parens'),
    require('./linters/string_quotes'),
    require('./linters/trailing_semicolon'),
    require('./linters/trailing_whitespace'),
    require('./linters/trailing_zero'),
    require('./linters/url_format'),
    require('./linters/url_quotes'),
    require('./linters/zero_unit')
];

exports.lint = function (input, path, config) {
    var ast = this.parseAST(input);
    var errors = [];

    ast.traverse(function (node) {
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
        return error !== null;
    });

    return flatten(errors);
};

exports.parseAST = function (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
