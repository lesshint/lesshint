'use strict';

module.exports = {
    name: 'idSelector',
    nodeTypes: ['selector'],
    message: 'Selectors should not use IDs.',

    lint: function idSelectorLinter (config, node) {
        var valid = true;
        var excludes;
        var start;

        excludes = config.exclude.map(function (id) {
            // Remove #
            return id.replace(/^\#/, '');
        });

        node.content.some(function (element) {
            var name = element.first('ident') && element.first('ident').content;

            if (element.type === 'id' && excludes.indexOf(name) === -1) {
                valid = false;
                start = element.start;

                return true;
            }

            return false;
        });

        if (!valid) {
            return [{
                column: start.column,
                line: start.line,
                message: this.message
            }];
        }
    }
};
