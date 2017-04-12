'use strict';

const postcssLess = require('postcss-less');
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

/**
  * Tests selectors for pseudo classes/selectors. eg. :not(), :active
  * Temporary fix for https://github.com/webschik/postcss-less/issues/56
  */
const rPseudo = /::?[^ ,:.]+/g;

class Linter {
    constructor (source, fullPath, options) {
        // Include trailing line endings, needs to run before any normalization
        this.linesRaw = source.match(/([^\r\n]*(?:\r?\n)|[^\r\n]+)/g);

        source = source.replace(/\r\n|\r|\n/g, '\n'); // Normalize line endings. See #40

        const tree = this.parse(source);

        this.ast = tree.root.toResult();
        this.ast = Object.freeze(this.ast);

        this.filename = path.basename(fullPath);
        this.fullPath = path.resolve(process.cwd(), fullPath);
        this.lines = source.split('\n');
        this.options = options;
        this.results = [];

        this.severity = {
            error: 'error',
            warning: 'warning'
        };

        this.configure();
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
                    throw new Error(`Linter "${ linter.name }" must return an array.`);
                }

                lint.forEach((piece) => {
                    const column = piece.column || node.source.start.column;
                    const line = piece.line || node.source.start.line;
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
                        message: 'Unknown linting error. Source: ' + linter.name,
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
        this.lineOptions = [];

        // Fetch all single line options
        this.ast.root.walkComments((node) => {
            const option = this.parseOption(node);
            const key = Object.keys(option)[0];

            option[key] = merge(option[key], {
                line: node.source.start.line
            });

            this.lineOptions.push(option);
        });

        const inlineOptions = this.getInlineOptions(this.ast.root.first);

        this.options = merge(this.options, inlineOptions);
    }

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

        this.results = sortBy(this.results, 'column');
        this.results = sortBy(this.results, 'line');

        return this.results;
    }

    parse (source) {
        return postcss([]).process(source, {
            syntax: postcssLess
        });
    }

    parseOption (node) {
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
