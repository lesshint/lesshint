'use strict';

module.exports = {
    name: 'emptyRule',
    nodeTypes: ['rule'],
    message: "There shouldn't be any empty rules present.",

    lint: function emptyRuleLinter (config, node) {
        // If it's a bodiless rule or a mixin function definition, bail.
        if (node.params) {
            return;
        }

        /**
         * A tad hacky, just because there's no way to excplictly tell
         * if there are any declarations or not.
         */
        let hasDeclarations = false;

        const nodeTypes = ['atrule', 'decl'];
        node.walk((child) => {
            if (nodeTypes.includes(child.type)) {
                hasDeclarations = true;

                return false;
            }
        });

        if (!hasDeclarations || !node.nodes.length) {
            return [{
                message: this.message
            }];
        }
    }
};
