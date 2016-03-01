'use strict';

var gonzales = require('gonzales-pe');
var sortBy = require('lodash.sortby');
var merge = require('lodash.merge');
var helpers = require('./helpers');
var path = require('path');

var linters = [
    require('./linters/attribute_quotes'),
    require('./linters/border_zero'),
    require('./linters/comment'),
    require('./linters/decimal_zero'),
    require('./linters/depth_level'),
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
    require('./linters/space_around_operator'),
    require('./linters/space_before_brace'),
    require('./linters/space_between_parens'),
    require('./linters/string_quotes'),
    require('./linters/trailing_semicolon'),
    require('./linters/trailing_whitespace'),
    require('./linters/url_format'),
    require('./linters/url_quotes'),
    require('./linters/zero_unit')
];

var parseRules = function (node) {
    var rules = node.content.match(/^\s*lesshint\s+(.*)/);

    if (!rules) {
        return {};
    }

    rules = rules[1].trim();
    rules = rules.replace(/([a-z0-9]+)\s*:/ig, '"$1":');

    try {
        rules = JSON.parse('{' + rules + '}');
    } catch (e) {
        throw new Error('Invalid inline option on line ' + node.start.line);
    }

    // If it's only shorthand enabled or disabled, account for that
    Object.keys(rules).forEach(function (rule) {
        if (typeof rules[rule] === 'boolean') {
            rules[rule] = {
                enabled: rules[rule]
            };
        }
    });

    return rules;
};

var getInlineOptions = function (node) {
    var start;

    node = helpers.ensureObject(node);
    start = helpers.ensureObject(node.start);

    // Not the first thing in the file, bail
    if (start.line !== 1 && start.column !== 1) {
        return {};
    }

    return parseRules(node);
};

exports.resultSeverity = {
    error: 'error',
    warning: 'warning'
};

exports.lint = function (input, fullPath, config) {
    var filename = path.basename(fullPath);
    var lineOptions = [];
    var results = [];
    var inlineOptions;
    var firstComment;
    var lines;
    var ast;

    input = input.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40
    lines = input.split('\n');
    ast = this.parseAST(input);

    // Freeze the AST so linters won't accidentally change it
    Object.freeze(ast);

    // Fetch inline options and merge it with whatever passed
    firstComment = ast.first('multilineComment') || ast.first('singlelineComment');
    inlineOptions = getInlineOptions(firstComment);
    config = merge(config, inlineOptions);

    // Fetch all single line options before we start the actual linting
    ast.traverseByTypes(['multilineComment', 'singlelineComment'], function (node) {
        var option = parseRules(node);
        var key = Object.keys(option)[0];

        option[key] = merge(option[key], {
            line: node.start.line
        });

        lineOptions.push(option);
    });

    ast.traverse(function (node) {
        linters.forEach(function (linter) {
            var options = config[linter.name];
            var lint;

            // Bail if the linter isn't wanted
            if (!options || (options && !options.enabled)) {
                return;
            }

            // Node type(s) not applicable, bail
            if (Array.isArray(linter.nodeTypes) && linter.nodeTypes.indexOf(node.type) === -1) {
                return;
            }

            lint = linter.lint.call(linter, options, node);

            if (lint) {
                if (!Array.isArray(lint)) {
                    throw new Error('Linter ' + linter.name + ' must return an array.');
                }

                lint.forEach(function (piece) {
                    var line = piece.line || node.start.line;
                    var shouldIgnore = lineOptions.some(function (lineOption) {
                        lineOption = lineOption[linter.name];

                        if (!lineOption) {
                            return false;
                        }

                        return lineOption.line === line && !lineOption.enabled;
                    });

                    if (shouldIgnore) {
                        return;
                    }

                    /**
                     * Each piece of lint (linter result) can override
                     * the default properties of the result we're adding
                     * to the collection
                     */
                    results.push(merge({
                        column: node.start.column,
                        file: filename,
                        fullPath: fullPath,
                        line: line,
                        linter: linter.name,
                        message: 'Unknown linting error. Source: ' + linter.name,
                        severity: options.severity || exports.resultSeverity.warning,
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
