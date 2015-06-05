'use strict';

var path = require('path');

module.exports = function (options) {
    var filename = path.basename(options.path);
    var config = options.config;
    var node = options.node;
    var properties = [];
    var excludes = [];
    var errors = [];

    // Bail if the linter isn't wanted
    if (!config.duplicateProperty || (config.duplicateProperty && !config.duplicateProperty.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'block') {
        return null;
    }

    excludes = config.duplicateProperty.exclude;

    node.forEach('declaration', function (declaration) {
        var property = declaration.first('property').content[0];

        if ((property && property.type === 'ident') && properties.indexOf(property.content) !== -1) {
            errors.push({
                message: 'Duplicate property: "' + property.content + '".',
                column: property.start.column,
                line: property.start.line
            });
        }

        if (excludes.indexOf(property.content) === -1) {
            properties.push(property.content);
        }
    });

    if (errors.length) {
        return errors.map(function (error) {
            return {
                column: error.column,
                file: filename,
                line: error.line,
                linter: 'duplicateProperty',
                message: error.message
            };
        });
    }

    return null;
};
