'use strict';

var gonzales = require('gonzales-pe');
var sortBy = require('lodash.sortby');
var merge = require('lodash.merge');
var path = require('path');

var linters = [
    require('./linters/attribute_quotes'),
    require('./linters/border_zero'),
    require('./linters/comment'),
    require('./linters/decimal_zero'),
    require('./linters/duplicate_property'),
    require('./linters/empty_rule'),
    require('./linters/final_newline'),
    require('./linters/hex_length'),
    require('./linters/hex_notation'),
    require('./linters/hex_validation'),
    require('./linters/id_selector'),
    require('./linters/import_path'),
    require('./linters/important_rule'),
    require('./linters/property_ordering'),
    require('./linters/property_units'),
    require('./linters/qualifying_element'),
    require('./linters/selector_naming'),
    require('./linters/single_line_per_property'),
    require('./linters/single_line_per_selector'),
    require('./linters/space_after_property_colon'),
    require('./linters/space_after_property_name'),
    require('./linters/space_after_property_value'),
    require('./linters/space_around_comma'),
    require('./linters/space_before_brace'),
    require('./linters/space_between_parens'),
    require('./linters/string_quotes'),
    require('./linters/trailing_semicolon'),
    require('./linters/trailing_whitespace'),
    require('./linters/url_format'),
    require('./linters/url_quotes'),
    require('./linters/zero_unit')
];

exports.resultSeverity = {
    error: 'error',
    warning: 'warning'
};

exports.lint = function (input, fullPath, config) {
    var filename = path.basename(fullPath);
    var results = [];
    var lines;
    var ast;

    input = input.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40
    lines = input.split('\n');

    ast = this.parseAST(input);

    // Freeze the AST so linters won't accidentally change it
    Object.freeze(ast);

    ast.traverse(function (node) {
        linters.forEach(function (linter) {
            var lint;

            // Bail if the linter isn't wanted
            if (!config[linter.name] || (config[linter.name] && !config[linter.name].enabled)) {
                return;
            }

            // Node type(s) not applicable, bail
            if (Array.isArray(linter.nodeTypes) && linter.nodeTypes.indexOf(node.type) === -1) {
                return;
            }

            lint = linter.lint.call(linter, config[linter.name], node);

            if (lint) {
                if (!Array.isArray(lint)) {
                    throw new Error('Linter ' + linter.name + ' must return an array.');
                }

                lint.forEach(function (piece) {
                    var line = piece.line || node.start.line;

                    /**
                     * Each piece of lint (linter result) can override
                     * the default properties of the result we're adding
                     * to the collection
                     */
                    results.push(merge({
                        column: node.start.column,
                        file: filename,
                        line: line,
                        linter: linter.name,
                        message: 'Unknown linting error. Source: ' + linter.name,
                        severity: exports.resultSeverity.warning,
                        source: line ? lines[line - 1] : ''
                    }, piece));
                });
            }
        });
    });

    results = sortBy(results, 'column');
    results = sortBy(results, 'line');

    return results;
};

exports.parseAST = function (input) {
    return gonzales.parse(input, {
        syntax: 'less'
    });
};
