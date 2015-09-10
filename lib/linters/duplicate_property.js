'use strict';

module.exports = {

    name: 'duplicateProperty',
    nodeTypes: ['block'],

    lint: function (config, node) {
        var properties = [];
        var excludes = [];
        var results = [];

        excludes = config.duplicateProperty.exclude;

        node.forEach('declaration', function (declaration) {
            var property = declaration.first('property').content[0];

            if ((property && property.type === 'ident') && properties.indexOf(property.content) !== -1) {
                results.push({
                    message: 'Duplicate property: "' + property.content + '".',
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
