'use strict';

module.exports = {
    name: 'trailingSemicolon',
    nodeTypes: ['rule', 'atrule'],
    message: 'All property declarations should end with a semicolon.',

    lint: function trailingSemicolonLinter (config, node) {
        var others = 0;

        if (node.ruleWithoutBody || !node.nodes.length) {
            return;
        }

        if (!node.raws.semicolon) {
            node.walk(function (n) {
                if (n.type !== 'decl') {
                    others++;
                }
            });

            /**
             * If the node contains child nodes that aren't Declarations,
             * then PostCSS will report raws.semicolon: false. in that case
             * we should wait until lesshint walks to that Rule/AtRule, and
             * let the linter handle that one.
             */
            if (others === 0) {
                return [{
                    column: node.source.start.column,
                    line: node.source.start.line,
                    message: this.message
                }];
            }
        }
    }
};
