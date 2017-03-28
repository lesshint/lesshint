'use strict';

module.exports = {
    name: 'noArray',
    nodeTypes: ['comment'],
    message: 'Not an array.',

    lint: function noArrayLinter () {
        return this.message;
    }
};
