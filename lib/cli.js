/*eslint no-console: 0*/

'use strict';

var Runner = require('./runner');
var exit = require('exit');

module.exports = function (program) {
    return new Runner(program)
        .run()
        .always(function (deferred) {
            var result = deferred.valueOf();

            if (result.errors) {
                result.errors.forEach(function (error) {
                    console.error(error);
                });
            }

            exit(result.code);
            return result.code;
        });
};
