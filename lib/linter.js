'use strict';

const postcssLess = require('postcss-less');
const sortBy = require('lodash.sortby');
const merge = require('lodash.merge');
const postcss = require('postcss');
const path = require('path');

const defaultLinters = [
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
    require('./linters/max_char_per_line'),
    require('./linters/max_char_per_line'),
    require('./linters/newline_after_block'),
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
    require('./linters/universal_selector'),
    require('./linters/url_format'),
    require('./linters/url_quotes'),
    require('./linters/variable_value'),
    require('./linters/zero_unit')
];

const parseRules = function (node) {
    let rules = node.text.match(/^\s*lesshint\s+(.*)/);

    if (!rules) {
        return {};
    }

    rules = rules[1].trim();
    rules = rules.replace(/([a-z0-9]+)\s*:/ig, '"$1":');

    try {
        rules = JSON.parse('{' + rules + '}');
    } catch (e) {
        throw new Error('Invalid inline option on line ' + node.source.start.line);
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

const getInlineOptions = function (node) {
    node = node || {};

    if (node.type !== 'comment') {
        return {};
    }

    const start = node.source.start;

    // Not the first thing in the file, bail
    if (start.line !== 1 && start.column !== 1) {
        return {};
    }

    return parseRules(node);
};

const runChecks = function (ast, fullPath, lines, linesRaw, config) {
    const filename = path.basename(fullPath);
    const lineOptions = [];
    const results = [];

    // Tests selectors for pseudo classes/selectors. eg. :not(), :active
    const rPseudo = /::?[^ ,:.]+/g;

    const checkNode = function (node) {
        linters.forEach(function (linter) {
            const options = config[linter.name];

            // Bail if the linter isn't wanted
            if (!options || (options && options !== true && !options.enabled)) {
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

            const lint = linter.lint.call(linter, options, node);

            if (lint) {
                if (!Array.isArray(lint)) {
                    throw new Error('Linter ' + linter.name + ' must return an array.');
                }

                lint.forEach(function (piece) {
                    const line = piece.line || node.source.start.line;
                    const shouldIgnore = lineOptions.some(function (lineOption) {
                        lineOption = lineOption[linter.name];

                        if (!lineOption) {
                            return false;
                        }

                        return lineOption.line === line && !lineOption.enabled;
                    });

                    if (shouldIgnore) {
                        return;
                    }

                    // Each piece of lint (linter result) can override
                    // the default properties of the result we're adding
                    // to the collection
                    piece = merge({
                        column: node.source.start.column,
                        file: filename,
                        fullPath: fullPath,
                        line: line,
                        linter: linter.name,
                        message: 'Unknown linting error. Source: ' + linter.name,
                        severity: options.severity || exports.resultSeverity.warning,
                        source: line ? lines[line - 1] : ''
                    }, piece);

                    piece.position = piece.column
                        + linesRaw.slice(0, piece.line - 1).join('').length
                        - 1;

                    results.push(piece);
                });
            }
        });
    };

    // Freeze the AST so linters won't accidentally change it
    Object.freeze(ast);

    // Fetch inline options and merge it with whatever passed
    const inlineOptions = getInlineOptions(ast.root.first);

    config = merge(config, inlineOptions);

    // Load any additional linters
    const linters = mergeLintersFromConfig(defaultLinters, config);

    // Fetch all single line options before we start the actual linting
    ast.root.walkComments(function (node) {
        const option = parseRules(node);
        const key = Object.keys(option)[0];

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

const mergeLintersFromConfig = function (defaultLinters, config) {
    if (!config.linters) {
        return defaultLinters;
    }

    if (!(config.linters instanceof Array)) {
        throw new Error('linters should be an array of file paths and/or linters');
    }

    return defaultLinters.concat(config.linters.map(requireConfigLinter));
};

const requireConfigLinter = function (linter) {
    if (typeof linter !== 'string') {
        return linter;
    }

    let pathToLinter;
    try {
        pathToLinter = require.resolve(path.join(process.cwd(), linter));
    } catch (e) {
        pathToLinter = require.resolve(linter);
    }

    return require(pathToLinter);
};

exports.resultSeverity = {
    error: 'error',
    warning: 'warning'
};

exports.lint = function (input, fullPath, config) {
    const linesRaw = input.match(/[^\n]+(?:\r?\n|$)/g); // Include trailing line endings

    input = input.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40
    fullPath = path.resolve(process.cwd(), fullPath);

    try {
        const lines = input.split('\n');
        const parser = this.getParser(input);
        const ast = parser.root.toResult();
        let results = runChecks(ast, fullPath, lines, linesRaw, config);

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
