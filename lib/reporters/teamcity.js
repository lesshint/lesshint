'use strict';

var util = require('util');

module.exports = {
    report: function (errors) {
        var lastFile = '';

        console.log('##teamcity[testSuiteStarted name=\'LessHint\']');

        errors.forEach(function (err) {
            if (lastFile !== err.fullPath) {
                if (lastFile) {
                    console.log(util.format('##teamcity[testFinished name=\'%s\']', lastFile));
                }

                lastFile = err.fullPath;
                console.log(util.format('##teamcity[testStarted name=\'%s\']', lastFile));
            }

            console.log(
                util.format(
                    '##teamcity[testFailed name=\'%s\' message=\'line %d, col %d, %s [%s] %s\']',
                    lastFile,
                    err.line,
                    err.column,
                    err.severity === 'error' ? 'Error' : 'Warning',
                    err.linter,
                    err.message
                )
            );
        });

        if (errors.length) {
            console.log(util.format('##teamcity[testFinished name=\'%s\']', lastFile));
        } else {
            console.log('##teamcity[testStarted name=\'LessHint\']');
            console.log('##teamcity[testFinished name=\'LessHint\']');
        }

        console.log('##teamcity[testSuiteFinished name=\'LessHint\']');
    }
};
