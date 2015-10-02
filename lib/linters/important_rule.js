'use strict';

module.exports = {
    name: 'importantRule',
    nodeTypes: ['declaration'],
    message: '!important should not be used.',

    lint: function importantRuleLinter (config, node) {
        var value;

        node.forEach('value', function (element) {
            value = element.first('important');
        });

        if (value) {
            return [{
                column: value.start.column,
                line: value.start.line,
                message: this.message
            }];
        }
    }
};
