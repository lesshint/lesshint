'use strict';

var flatten = require('lodash.flatten');
var gonzales = require('gonzales-pe');
var path = require('path');

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

var processResults = function (results, input, fullPath) {
    var filename = path.basename(fullPath);
    var lines = input.split('\n');

    results = results.filter(function (result) {
        return result !== null;
    });

    results = flatten(results);
    results = results.map(function (result) {
        var line = result.line;

        result.file = filename;
        result.source = line ? lines[line - 1] : '';

        if (!result.type) {
            result.type = exports.resultTypes.warning;
        }

        return result;
    });

    return results;
};

var mapResults = function (results) {
    var map = {warnings: [], errors: []};

    results.forEach(function (result) {
        if (result.type === exports.resultTypes.warning) {
            map.warnings.push(result);
        } else if (result.type === exports.resultTypes.error) {
            map.errors.push(result);
        }
    });

    return map;
};

exports.resultTypes = {
    error: 'ERROR',
    warning: 'WARNING'
};

exports.lint = function (input, fullPath, config) {
    var results = [];
    var ast;

    input = input.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40
    ast = this.parseAST(input);

    // Freeze the AST so linters won't accidentally change it
    Object.freeze(ast);

    ast.traverse(function (node) {
        var i;

        for (i = 0; i < linters.length; i++) {
            results.push(linters[i].call(null, {
                config: config,
                node: node
            }));
        }
    });

    if (config.mapResults) {
        results = processResults(results, input, fullPath);
        return mapResults(results);
    } else {
        return processResults(results, input, fullPath);
    }
};

exports.parseAST = function (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
