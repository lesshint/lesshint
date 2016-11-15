/*eslint no-console: 0*/

'use strict';

var Runner = require('./runner');
var exit = require('exit');

module.exports = function (program) {
    return new Runner(program)
        .run()
        .always(function (status) {
            exit(status.valueOf());
            return status;
        });
};
