'use strict';

module.exports = {
    name: 'selectorNaming',
    nodeTypes: ['selector'],
    message: 'Selector should respect naming convention.',

    lint: function selectorNamingLinter (config, node) {
        var start;
        var hasErrors;
        var exclude;

        config = config || {};
        exclude = config.exclude;

        hasErrors = node.content.some(function (element) {
            var name = element.first('ident') && element.first('ident').content;

            if (name === null) {
                return false;
            }

            if (exclude && exclude.indexOf(name) > -1) {
                return false;
            }

            if ((config.disallowUppercase === true && name.toLowerCase() !== name) ||
                (config.disallowUnderscore === true && name.indexOf('_') > -1) ||
                (config.disallowDash === true && name.indexOf('-') > -1)) {

                start = element.start;
                return true;
            }

            return false;
        });

        if (hasErrors) {
            return [{
                column: start.column,
                line: start.line,
                message: this.message
            }];
        }
    }
};
