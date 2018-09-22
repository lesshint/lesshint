'use strict';

const isAbsoluteURL = require('../utils/is-absolute-url');
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
        if (!node.import) {
            return;
        }

        const { filename } = node;
        const value = filename.trim().replace(/['"]/g, '');

        // Exit if the path is a absolute URL or excluded
        if (isAbsoluteURL(value) || config.exclude.includes(value)) {
            return;
        }

        const results = [];
        const { column, line } = node.positionBy({
            word: value
        });

        // Check extension
        switch (config.filenameExtension) {
            case false:
                if (path.extname(value) === '.less') {
                    results.push({
                        column,
                        line,
                        message: util.format(this.message.extension, value, ' not')
                    });
                }

                break;
            case true:
                if (!path.extname(value)) {
                    results.push({
                        column,
                        line,
                        message: util.format(this.message.extension, value, '')
                    });
                }

                break;
        }

        // Check leading underscore
        switch (config.leadingUnderscore) {
            case false:
                if (/^_/.test(value)) {
                    results.push({
                        column,
                        line,
                        message: util.format(this.message.underscore, value, ' not')
                    });
                }

                break;
            case true:
                if (!/^_/.test(value)) {
                    results.push({
                        column,
                        line,
                        message: util.format(this.message.underscore, value, '')
                    });
                }

                break;
        }

        if (results.length) {
            return results;
        }
    }
};
