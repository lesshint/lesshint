'use strict';

var Runner = require('./runner');
var Vow = require('vow');

module.exports = function (program, logger) {
    var exitDefer = Vow.defer();

    new Runner(program, logger)
        .run()
        .then(function (deferred) {
            exitDefer.resolve(deferred.valueOf().code);
        })
        .catch(function (deferred) {
            var result = deferred.valueOf();

            if (result.errors) {
                result.errors.forEach(function (error) {
                    logger.error(error);
                });
            }

            exitDefer.reject(deferred.valueOf().code);
        });

    return exitDefer.promise();
};
