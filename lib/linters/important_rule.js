'use strict';

module.exports = {
    name: 'importantRule',
    nodeTypes: ['rule'],
    message: '!important should not be used.',

    lint: function importantRuleLinter (config, node) {
        var results = [];
        var self = this;

        node.walkDecls(function (decl) {
            if (decl.important) {
                results.push({
                    column: decl.source.start.column,
                    line: decl.source.start.line,
                    message: self.message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
