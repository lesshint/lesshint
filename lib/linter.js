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

var parseRules = function (rules) {
    var result = {};

    // Split the rules and try to figure out if they're enabled or not
    rules = rules.split(',');
    rules.forEach(function (rule) {
        var value;
        var name;

        rule = rule.split(':');
        name = rule[0].trim();
        value = rule[1].trim();

        result[name] = (value === 'true');
    });

    return result;
};

var getInlineOptions = function (node, inlineOptions) {
    var matches;
    var rules;

    if (!node.is('multilineComment') && !node.is('singlelineComment')) {
        return inlineOptions;
    }

    matches = node.content.match(/^\s*lesshint\s+(.*)/);
    if (!matches) {
        return inlineOptions;
    }

    rules = parseRules(matches[1]);

    return merge(inlineOptions, rules);
};

var getLineOptions = function (node, lineOptions) {
    var matches;

    if (!node.is('multilineComment') && !node.is('singlelineComment')) {
        return lineOptions;
    }

    matches = node.content.match(/^\s*lesshint-line(.*)/);
    if (!matches) {
        return lineOptions;
    }

    lineOptions['line-' + node.start.line] = parseRules(matches[1]);

    return lineOptions;
};

exports.resultSeverity = {
    error: 'error',
    warning: 'warning'
};

exports.lint = function (input, fullPath, config) {
    var filename = path.basename(fullPath);
    var inlineOptions = {};
    var lineOptions = {};
    var results = [];
    var lines;
    var ast;

    input = input.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40
    lines = input.split('\n');
    ast = this.parseAST(input);

    // Freeze the AST so linters won't accidentally change it
    Object.freeze(ast);

    // Fetch all ignored lines before we start the actual linting
    ast.traverseByTypes(['multilineComment', 'singlelineComment'], function (node) {
        lineOptions = getLineOptions(node, lineOptions);
    });

    ast.traverse(function (node) {
        // We check inline options here since they can be disabled/enabled at any time
        inlineOptions = getInlineOptions(node, inlineOptions);

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

            // Linter temporarily disabled, bail
            if (inlineOptions[linter.name] === false) {
                return;
            }

            lint = linter.lint.call(linter, options, node);

            if (lint) {
                if (!Array.isArray(lint)) {
                    throw new Error('Linter ' + linter.name + ' must return an array.');
                }

                lint.forEach(function (piece) {
                    var line = piece.line || node.start.line;
                    var maybeIgnore = helpers.ensureObject(lineOptions['line-' + line]);

                    // Check if this rule should be ignored on this line
                    if (maybeIgnore[linter.name] === false) {
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
