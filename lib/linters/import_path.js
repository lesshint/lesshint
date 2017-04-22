'use strict';

const isAbsoluteURL = require('../utils/is-absolute-url');
const parseValue = require('../utils/parse-value');
const path = require('path');
const util = require('util');

module.exports = {
    name: 'importPath',
    nodeTypes: ['atrule'],
    message: {
        extension: 'Imported file, "%s" should%s include the file extension.',
        underscore: 'Imported file, "%s" should%s include a leading underscore.'
    },

    lint: function importPathLinter (config, node) {
        if (node.name !== 'import') {
            return;
        }

        /**
         * Temporary fix for https://github.com/lesshint/lesshint/issues/236
         * TODO: postcss-less really needs to be fixed to make this proper.
         */
        const importOptsRx = /(\s+)?\((\s+)?(reference|inline|less|css|once|multiple|optional)(\s+)?\)(\s+)?/gi;
        const params = node.params.replace(importOptsRx, '');
        const ast = parseValue(params);

        let value = ast.first.first;

        // Extract the value if it's a url() call
        if (value.type === 'func' && value.value === 'url') {
            value = value.first.next();
        }

        const file = value.value.trim().replace(/['"]/g, '');

        // Exit if the path is a absolute URL or excluded
        if (isAbsoluteURL(file) || config.exclude.indexOf(file) !== -1) {
            return;
        }

        const results = [];

        // Check extension
        switch (config.filenameExtension) {
            case false:
                if (path.extname(file) === '.less') {
                    results.push({
                        column: node.source.start.column + node.name.length + value.source.start.column + 1,
                        line: node.source.start.line,
                        message: util.format(this.message.extension, file, ' not')
                    });
                }

                break;
            case true:
                if (!path.extname(file)) {
                    results.push({
                        column: node.source.start.column + node.name.length + value.source.start.column + 1,
                        line: node.source.start.line,
                        message: util.format(this.message.extension, file, '')
                    });
                }

                break;
        }

        // Check leading underscore
        switch (config.leadingUnderscore) {
            case false:
                if (/^_/.test(file)) {
                    results.push({
                        column: node.source.start.column + node.name.length + value.source.start.column + 1,
                        line: node.source.start.line,
                        message: util.format(this.message.underscore, file, ' not')
                    });
                }

                break;
            case true:
                if (!/^_/.test(file)) {
                    results.push({
                        column: node.source.start.column + node.name.length + value.source.start.column + 1,
                        line: node.source.start.line,
                        message: util.format(this.message.underscore, file, '')
                    });
                }

                break;
        }

        if (results.length) {
            return results;
        }
    }
};
