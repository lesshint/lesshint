'use strict';

var parser = require('postcss-values-parser');
var helpers = require('../helpers');
var path = require('path');
var util = require('util');

module.exports = {
    name: 'importPath',
    nodeTypes: ['atrule'],
    message: {
        extension: 'Imported file, "%s" should%s include the file extension.',
        underscore: 'Imported file, "%s" should%s include a leading underscore.'
    },

    lint: function importPathLinter (config, node) {
        var results = [];
        var importOptsRx = /(\s+)?\((\s+)?(reference|inline|less|css|once|multiple|optional)(\s+)?\)(\s+)?/gi;
        var value;
        var file;
        var ast;
        var params;

        if (node.name !== 'import') {
            return;
        }

        // temporary fix for https://github.com/lesshint/lesshint/issues/236
        // TODO: postcss-less really needs to be fixed to make this proper.
        params = node.params.replace(importOptsRx, '');

        ast = parser(params).parse();
        value = ast.first.first;

        // Extract the value if it's a url() call
        if (value.type === 'func' && value.value === 'url') {
            value = value.first.next();
        }

        file = value.value.trim().replace(/['"]/g, '');

        // Ignore absolute URLs
        if (helpers.isAbsoluteURL(file)) {
            return;
        }

        // Check if file is excluded
        if (config.exclude.indexOf(file) !== -1) {
            return;
        }

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
