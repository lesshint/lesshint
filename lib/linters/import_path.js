'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var results = [];
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
                results.push({
                    column: value.start.column,
                    line: value.start.line,
                    message: 'Imported file, "' + file + '" should not include the file extension.'
                });
            }

            break;
        case true:
            if (!path.extname(file)) {
                results.push({
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
                results.push({
                    column: value.start.column,
                    line: value.start.line,
                    message: 'Imported file, "' + file + '" should not include a leading underscore.'
                });
            }

            break;
        case true:
            if (!/^_/.test(file)) {
                results.push({
                    column: value.start.column,
                    line: value.start.line,
                    message: 'Imported file, "' + file + '" should include a leading underscore.'
                });
            }

            break;
    }

    if (results.length) {
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'importPath',
                message: result.message
            };
        });
    }

    return null;
};
