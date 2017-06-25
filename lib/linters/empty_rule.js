'use strict';

module.exports = {
    name: 'emptyRule',
    nodeTypes: ['rule'],
    message: "There shouldn't be any empty rules present.",

    lint: function emptyRuleLinter (config, node) {
        // If it's a bodiless rule or a mixin function definition, bail.
        if (node.empty || node.params) {
            return;
        }

        /**
         * A tad hacky, just because there's no way to excplictly tell
         * if there are any declarations or not.
         */
        let hasDeclarations = false;

        const nodeTypes = ['atrule', 'decl', 'import'];
        node.walk(function (child) {
            if (nodeTypes.indexOf(child.type) !== -1 || (child.type === 'rule' && child.empty)) {
                hasDeclarations = true;

                return false;
            }
        });

        if (hasDeclarations) {
            return;
        }

        if (!hasDeclarations || !node.nodes.length) {
            return [{
                message: this.message
            }];
        }
    }
};
