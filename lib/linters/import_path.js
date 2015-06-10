'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var errors = [];
    var excludes;
    var value;
    var file;

    // Bail if the linter isn't wanted
    if (!config.importPath || (config.importPath && !config.importPath.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (!node.is('atrules')) {
        return null;
    }

    if (node.first('atkeyword').first('ident').content !== 'import') {
        return null;
    }

    value = node.first('string');
    file = value.content.replace(/['"]/g, '');

    // Check if file is excluded
    if (config.importPath.exclude.indexOf(file) !== -1) {
        return null;
    }

    // Check extension
    switch (config.importPath.filenameExtension) {
        case false:
            if (path.extname(file)) {
                errors.push({
                    column: value.start.column,
                    line: value.start.line,
                    message: 'Imported file, "' + file + '" should not include the file extension.'
                });
            }

            break;
        case true:
            if (!path.extname(file)) {
                errors.push({
                    column: value.start.column,
                    line: value.start.line,
                    message: 'Imported file, "' + file + '" should include the file extension.'
                });
            }

            break;
    }

    // Check leading underscore
    switch (config.importPath.leadingUnderscore) {
        case false:
            if (/^_/.test(file)) {
                errors.push({
                    column: value.start.column,
                    line: value.start.line,
                    message: 'Imported file, "' + file + '" should not include a leading underscore.'
                });
            }

            break;
        case true:
            if (!/^_/.test(file)) {
                errors.push({
                    column: value.start.column,
                    line: value.start.line,
                    message: 'Imported file, "' + file + '" should include a leading underscore.'
                });
            }

            break;
    }

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'importPath',
                message: error.message
            };
        });
    }

    return null;
};
