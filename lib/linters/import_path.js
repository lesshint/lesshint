'use strict';

const isAbsoluteURL = require('../utils/is-absolute-url');
const parseValue = require('../utils/parse-value');
const path = require('path');
const util = require('util');

module.exports = {
    name: 'importPath',
    nodeTypes: ['import'],
    message: {
        extension: 'Imported file, "%s" should%s include the file extension.',
        underscore: 'Imported file, "%s" should%s include a leading underscore.'
    },

    lint: function importPathLinter (config, node) {
        const ast = parseValue(node.importPath);

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
        const position = node.positionBy({
            word: value.value
        });

        // Check extension
        switch (config.filenameExtension) {
            case false:
                if (path.extname(file) === '.less') {
                    results.push({
                        column: position.column,
                        line: position.line,
                        message: util.format(this.message.extension, file, ' not')
                    });
                }

                break;
            case true:
                if (!path.extname(file)) {
                    results.push({
                        column: position.column,
                        line: position.line,
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
                        column: position.column,
                        line: position.line,
                        message: util.format(this.message.underscore, file, ' not')
                    });
                }

                break;
            case true:
                if (!/^_/.test(file)) {
                    results.push({
                        column: position.column,
                        line: position.line,
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
