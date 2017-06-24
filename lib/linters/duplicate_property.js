'use strict';

const util = require('util');

module.exports = {
    name: 'duplicateProperty',
    nodeTypes: ['rule'],
    message: 'Duplicate property: "%s".',

    lint: function duplicatePropertyLinter (config, node) {
        const properties = [];
        const results = [];

        node.walkDecls((decl) => {
            /**
             * walkDecls will walk even those Declaration nodes that are nested
             * under other nested Rule nodes
             */
            if (decl.parent !== node) {
                return true;
            }

            if (!decl.prop.match(/\+_?$/) && properties.indexOf(decl.prop) >= 0) {
                results.push({
                    message: util.format(this.message, decl.prop),
                    column: decl.source.start.column,
                    line: decl.source.start.line
                });
            }

            /**
             * We let this happen regardless of if the array already
             * contains the property name, for debugging purposes. It doesn't
             * hurt anything.
             */
            if (!config.exclude || config.exclude.indexOf(decl.prop) < 0) {
                properties.push(decl.prop);
            }
        });

        if (results.length) {
            return results;
        }
    }
};
