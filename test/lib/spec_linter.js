
// this is necessary to duplicate the shared functionality of linter.lint
// within lib/linter.js. there's probably a better way to do this, but to
// get specs running correctly, this will work in the meantime.
module.exports = function (linter) {

    return function (config, node) {

        var results = [];
        var extend = require('lodash.assign');

        // Bail if the linter isn't wanted
        if (!config[linter.name] || (config[linter.name] && !config[linter.name].enabled)) {
            return;
        }

        if (linter.nodeTypes && Array.isArray(linter.nodeTypes) && linter.nodeTypes.length) {
            // Not applicable, bail
            if (linter.nodeTypes.indexOf(node.type) < 0) {
                return;
            }
        }

        lint = linter.lint.call(linter, config, node);

        if (lint) {
            // transform the linter result into an array
            // some linters return an array, some don't. and that's OK.
            if (!Array.isArray(lint)) {
                throw 'Linter ' + linter.name + ' must return an array.';
            }

            lint.forEach(function (piece) {
                // each piece of lint (linter result) can override
                // the default properties of the result we're adding
                // to the collection
                results.push(extend({
                        column: node.start.column,
                        line: node.start.line,
                        linter: linter.name,
                        message: 'Unknown linting error. Source: ' + linter.name
                    },
                    piece
                ));
            });

            return results;
        }
    };
};
