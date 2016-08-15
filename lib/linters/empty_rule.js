'use strict';

module.exports = {
    name: 'emptyRule',
    nodeTypes: ['rule'],
    message: "There shouldn't be any empty rules present.",

    lint: function emptyRuleLinter (config, node) {
        var hasDeclarations = false;

        // if it's a bodiless rule or a mixin function definition, bail.
        if (node.ruleWithoutBody || node.params) {
            return;
        }

        /**
         * A tad hacky, just because there's no way to excplictly tell
         * if there are any declarations or not.
         */
        node.walk(function (child) {
            if (child.type === 'decl' || child.type === 'atrule' ||
               (child.type === 'rule' && child.ruleWithoutBody)) {
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
