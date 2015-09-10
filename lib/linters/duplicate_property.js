'use strict';

module.exports = {

    name: 'duplicateProperty',
    nodeTypes: ['block'],

    // we'll use sprintf-js to format this
    message: 'Duplicate property: "%s".',

    lint: function duplicatePropertyLinter (config, node) {
        var properties = [];
        var excludes = [];
        var results = [];
        var self = this;

        // if we see this being used frequently, we can introduce a `util` param to the lint function
        var sprintf = require('sprintf-js').sprintf;

        excludes = config.duplicateProperty.exclude;

        node.forEach('declaration', function (declaration) {
            var property = declaration.first('property').content[0];

            if ((property && property.type === 'ident') && properties.indexOf(property.content) !== -1) {
                results.push({
                    // `this.message` works since we're allowed access to ourself as a linter object
                    // with the linter.lint.call in linter.js
                    message: sprintf(self.message, property.content),
                    column: property.start.column,
                    line: property.start.line
                });
            }

            if (excludes.indexOf(property.content) === -1) {
                properties.push(property.content);
            }
        });

        if (results.length) {
            // we moved the 'linter' prop to linter.js,
            // so no need to map the results
            return results;
        }
    }
};
