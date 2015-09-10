'use strict';

module.exports = {

    name: 'duplicateProperty',
    nodeTypes: ['block'],

    // we'll use sprintf-js to format this
    message: 'Duplicate property: "%s".'

    lint: function duplicatePropertyLinter (config, node) {
        var properties = [];
        var excludes = [];
        var results = [];

        // if we see this being used frequently, we can introduce a `util` param to the lint function
        var sprintf = require('sprintf-js');

        excludes = config.duplicateProperty.exclude;

        node.forEach('declaration', function (declaration) {
            var property = declaration.first('property').content[0];

            if ((property && property.type === 'ident') && properties.indexOf(property.content) !== -1) {
                results.push({
                    // `this.message` works since we're allowed access to ourself as a linter object
                    // with the linter.lint.call in linter.js
                    message: sprintf(this.message, property.content),
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

// module.exports = function (options) {
//     var config = options.config;
//     var node = options.node;
//     var properties = [];
//     var excludes = [];
//     var results = [];

//     // Bail if the linter isn't wanted
//     if (!config.duplicateProperty || (config.duplicateProperty && !config.duplicateProperty.enabled)) {
//         return null;
//     }

//     // Not applicable, bail
//     if (node.type !== 'block') {
//         return null;
//     }

//     excludes = config.duplicateProperty.exclude;

//     node.forEach('declaration', function (declaration) {
//         var property = declaration.first('property').content[0];

//         if ((property && property.type === 'ident') && properties.indexOf(property.content) !== -1) {
//             results.push({
//                 message: 'Duplicate property: "' + property.content + '".',
//                 column: property.start.column,
//                 line: property.start.line
//             });
//         }

//         if (excludes.indexOf(property.content) === -1) {
//             properties.push(property.content);
//         }
//     });

//     if (results.length) {
//         return results.map(function (result) {
//             return {
//                 column: result.column,
//                 line: result.line,
//                 linter: 'duplicateProperty',
//                 message: result.message
//             };
//         });
//     }

//     return null;
// };
