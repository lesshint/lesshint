'use strict';

module.exports = {
    name: 'sample',
    nodeTypes: ['comment'],
    message: 'Sample error.',

    lint: function commentLinter () {
        return [{
            message: this.message
        }];
    }
};
