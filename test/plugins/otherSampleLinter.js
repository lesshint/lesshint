'use strict';

module.exports = {
    name: 'otherSample',
    nodeTypes: ['comment'],
    message: 'Other sample error.',

    lint: function commentLinter () {
        return [{
            message: this.message
        }];
    }
};
