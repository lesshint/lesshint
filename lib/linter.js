'use strict';

const postcssLess = require('postcss-less');
const stringify = require('postcss-less/dist/less-stringify');
const sortBy = require('lodash.sortby');
const merge = require('lodash.merge');
const postcss = require('postcss');
const path = require('path');

const defaultLinters = [
    require('./linters/attribute_quotes'),
    require('./linters/border_zero'),
    require('./linters/color_variables'),
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
    require('./linters/space_around_bang'),
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

class Linter {
    constructor (source, fullPath, options) {
        // Include trailing line endings, needs to run before any normalization
        this.linesRaw = source.match(/([^\r\n]*(?:\r?\n)|[^\r\n]+)/g);

        source = source.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40

        this.filename = path.basename(fullPath);
        this.fullPath = path.resolve(process.cwd(), fullPath);
        this.lines = source.split('\n');
        this.options = options;
        this.results = [];

        const tree = this.parse(source);

        this.ast = tree.root.toResult({
            stringifier: stringify
        });
        this.ast = Object.freeze(this.ast);

        this.severity = {
            error: 'error',
            warning: 'warning'
        };

        this.configure();
        this.fetchInlineRules();
    }

    checkNode (node) {
        this.linters.forEach((linter) => {
            const options = this.options[linter.name];

            // Bail if the linter isn't wanted
            if (!options || (options && options !== true && !options.enabled)) {
                return;
            }

            // Node type(s) not applicable, bail
            if (Array.isArray(linter.nodeTypes) && linter.nodeTypes.indexOf(node.type) === -1) {
                return;
            }

            const lint = linter.lint.call(linter, options, node);

            if (lint) {
                if (!Array.isArray(lint)) {
                    throw new Error(`Linter "${ linter.name }" must return an array.`);
                }

                lint.forEach((piece) => {
                    const column = piece.column || node.source.start.column;
                    const line = piece.line || node.source.start.line;

                    // Old, deprecated way of single line inline configuration comments
                    const shouldIgnore = this.lineOptions.some((lineOption) => {
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
                    piece = merge({
                        column: column,
                        file: this.filename,
                        fullPath: this.fullPath,
                        line: line,
                        linter: linter.name,
                        message: `'Unknown linting error. Source: ${ linter.name }`,
                        position: column + this.linesRaw.slice(0, line - 1).join('').length - 1,
                        severity: options.severity || this.severity.warning,
                        source: line ? this.lines[line - 1] : ''
                    }, piece);

                    this.results.push(piece);
                });
            }
        });
    }

    configure () {
        this.linters = this.setupLinters(defaultLinters);

        // Fetch all single line options, deprecated
        this.lineOptions = [];
        this.ast.root.walkComments((node) => {
            const option = this.parseOption(node);
            const key = Object.keys(option)[0];

            option[key] = merge(option[key], {
                line: node.source.start.line
            });

            this.lineOptions.push(option);
        });

        const inlineOptions = this.getInlineOptions(this.ast.root.first);

        // Don't modify the original options object since it's shared between .less files
        this.options = merge({}, this.options, inlineOptions);
    }

    excludeResults () {
        this.results = this.results.filter((result) => {
            const linter = result.linter;
            const rules = this.inlineRules[linter] || this.inlineRules.all;

            if (!rules) {
                return true;
            }

            for (const rule of rules) {
                if (result.line >= rule.start && (result.line <= rule.end || rule.end === undefined)) {
                    return;
                }
            }

            return true;
        });
    }

    fetchInlineRules () {
        this.inlineRules = {};

        this.ast.root.walkComments((comment) => {
            const text = comment.text;

            if (!(/^\s*lesshint-.+/.test(text))) {
                return;
            }

            const line = comment.source.start.line;
            const match = text.match(/^\s*lesshint-[^\s]+/)[0];
            const cmd = match.replace('lesshint-', '');

            let rules;

            rules = text.slice(match.length).split(',');
            rules = rules.map((rule) => {
                return rule.trim();
            });
            rules = rules.filter((rule) => {
                return !!rule;
            });

            if (!rules.length) {
                rules = ['all'];
            }

            switch (cmd) {
                case 'disable':
                    rules.forEach((rule) => {
                        const options = {
                            start: line
                        };

                        this.inlineRules[rule] = this.inlineRules[rule] || [];
                        this.inlineRules[rule] = this.inlineRules[rule].concat(options);
                    });

                    break;
                case 'enable':
                    if (rules.length === 1 && rules[0] === 'all') {
                        rules = Object.keys(this.inlineRules);
                    }

                    rules.forEach((rule) => {
                        const length = this.inlineRules[rule].length;

                        this.inlineRules[rule][length - 1].end = line;
                    });

                    break;
                case 'disable-line':
                    rules.forEach((rule) => {
                        const options = {
                            end: line,
                            start: line
                        };

                        this.inlineRules[rule] = this.inlineRules[rule] || [];
                        this.inlineRules[rule] = this.inlineRules[rule].concat(options);
                    });

                    break;
                case 'disable-next-line':
                    rules.forEach((rule) => {
                        const options = {
                            end: line + 1,
                            start: line + 1
                        };

                        this.inlineRules[rule] = this.inlineRules[rule] || [];
                        this.inlineRules[rule] = this.inlineRules[rule].concat(options);
                    });

                    break;
                default:
                    this.results.push({
                        column: comment.source.start.column,
                        file: this.filename,
                        fullPath: this.fullPath,
                        line: line,
                        linter: 'parse error',
                        message: `Invalid inline configuration comment: "${ text }"`,
                        severity: 'error'
                    });
            }
        });
    }

    // Old, deprecated way of handling inline configuration comments
    getInlineOptions (node) {
        node = node || {};

        if (node.type !== 'comment') {
            return {};
        }

        const start = node.source.start;

        // Not the first thing in the file, bail
        if (start.line !== 1 && start.column !== 1) {
            return {};
        }

        return this.parseOption(node);
    }

    lint () {
        try {
            this.checkNode(this.ast.root);

            this.ast.root.walk((node) => {
                this.checkNode(node);
            });
        } catch (e) {
            // Just rethrow any exceptions and let someone else handle it
            throw e;
        }

        this.excludeResults();

        this.results = sortBy(this.results, 'column');
        this.results = sortBy(this.results, 'line');

        return this.results;
    }

    parse (source) {
        return postcss([]).process(source, {
            from: this.fullPath,
            syntax: postcssLess
        });
    }

    parseOption (node) {
        let rules = node.text.match(/^\s*lesshint\s+(.*)/);

        if (!rules) {
            return {};
        }

        rules = rules[1].trim();
        rules = rules.replace(/([a-z0-9\-_/]+)\s*:/ig, '"$1":');

        try {
            rules = JSON.parse('{' + rules + '}');
        } catch (e) {
            throw new Error(`Invalid inline option on line ${ node.source.start.line }`);
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
    }

    setupLinters (defaults) {
        if (!this.options.linters) {
            return defaults;
        }

        if (!Array.isArray(this.options.linters)) {
            throw new Error('Linters should be an array of file paths and/or linters');
        }

        const linters = this.options.linters.map((linter) => {
            if (typeof linter !== 'string') {
                return linter;
            }

            let linterPath;
            try {
                linterPath = require.resolve(path.join(process.cwd(), linter));
            } catch (e) {
                try {
                    linterPath = require.resolve(linter);
                } catch (e) {
                    const pathBasedOnConfig = this.options.configPath.replace('.lesshintrc', linter);
                    linterPath = require.resolve(pathBasedOnConfig);
                }
            }

            return require(linterPath);
        });

        return defaults.concat(linters);
    }
}

module.exports = Linter;
