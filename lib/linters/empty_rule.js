'use strict';

module.exports = {
    name: 'emptyRule',
    nodeTypes: ['rule'],
    message: "There shouldn't be any empty rules present.",

    lint: function emptyRuleLinter (config, node) {

        var hasDeclarations = false;

        // a tad hacky, just because there's no way to excplictly tell
        // if there are any or not.
        node.walkDecls(function () {
            hasDeclarations = true;
            return false;
        });

        // postcss-less doesn't yet recognize mixins within rules
        // tracking: https://github.com/webschik/postcss-less/issues/22
        // this catches it with a fair degree of certainty in the meantime.
        if (node.raws.after.trim().length > 0) {
            hasDeclarations = true;
        }

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
