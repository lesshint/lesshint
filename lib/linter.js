'use strict';

var postcssLess = require('postcss-less');
var sortBy = require('lodash.sortby');
var merge = require('lodash.merge');
var postcss = require('postcss');
var path = require('path');

var defaultLinters = [
    require('./linters/attribute_quotes'),
    require('./linters/newline_after_block'),
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
    require('./linters/zero_unit'),
    require('./linters/max_char_per_line')
];

var parseRules = function (node) {
    var rules = node.text.match(/^\s*lesshint\s+(.*)/);

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

    node = node || {};

    if (node.type !== 'comment') {
        return {};
    }

    start = node.source.start;

    // Not the first thing in the file, bail
    if (start.line !== 1 && start.column !== 1) {
        return {};
    }

    return parseRules(node);
};

var runChecks = function (ast, fullPath, lines, config) {
    var filename = path.basename(fullPath);
    var lineOptions = [];
    var results = [];
    var inlineOptions;
    var linters;

    // tests selectors for pseudo classes/selectors. eg. :not(), :active
    var rPseudo = /::?[^ ,:.]+/g;

    var checkNode = function (node) {
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

            // if we're dealing with a regular Rule (or other) node, which isn't
            // an actual Mixin or AtRule, and its selector contains a pseudo
            // class or selector, then clean up the raws and params properties.
            // tracking: https://github.com/webschik/postcss-less/issues/56
            // TODO: remove this when issue resolved
            if (node.params && rPseudo.test(node.selector)) {
                delete node.params;

                // this just started showing up in postcss-less@0.14.0. not sure
                // if it's sticking around, but making sure we're thorough.
                if (node.raws.params) {
                    delete node.raws.params;
                }
            }

            lint = linter.lint.call(linter, options, node);

            if (lint) {
                if (!Array.isArray(lint)) {
                    throw new Error('Linter ' + linter.name + ' must return an array.');
                }

                lint.forEach(function (piece) {
                    var line = piece.line || node.source.start.line;
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
                        column: node.source.start.column,
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
    };

    // Freeze the AST so linters won't accidentally change it
    Object.freeze(ast);

    // Fetch inline options and merge it with whatever passed
    inlineOptions = getInlineOptions(ast.root.first);
    config = merge(config, inlineOptions);

    // Load any additional linters
    linters = mergeLintersFromConfig(defaultLinters, config);

    // Fetch all single line options before we start the actual linting
    ast.root.walkComments(function (node) {
        var option = parseRules(node);
        var key = Object.keys(option)[0];

        option[key] = merge(option[key], {
            line: node.source.start.line
        });

        lineOptions.push(option);
    });

    // Check top-level root node
    checkNode(ast.root);

    // Walk through and check each node within (but not including) root
    ast.root.walk(function (node) {
        checkNode(node);
    });

    return results;
};

var mergeLintersFromConfig = function (defaultLinters, config) {
    if (!config.linters) {
        return defaultLinters;
    }

    if (!(config.linters instanceof Array)) {
        throw new Error('linters should be an array of file paths and/or linters');
    }

    return defaultLinters.concat(config.linters.map(requireConfigLinter));
};

var requireConfigLinter = function (linter) {
    if (typeof linter === 'string') {
        return require(linter);
    }

    return linter;
};

exports.resultSeverity = {
    error: 'error',
    warning: 'warning'
};

exports.lint = function (input, fullPath, config) {
    var results;
    var parser;
    var lines;
    var ast;

    input = input.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40
    lines = input.split('\n');

    try {
        parser = this.getParser(input);
        ast = parser.root.toResult();

        results = runChecks(ast, fullPath, lines, config);
        results = sortBy(results, 'column');
        results = sortBy(results, 'line');

        return results;
    } catch (e) {
        // Just rethrow the exception and let someone else handle it
        throw e;
    }
};

exports.getParser = function (input) {
    return postcss([]).process(input, {
        syntax: postcssLess
    });
};
