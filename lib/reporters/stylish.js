'use strict';

var chalk = require('chalk');

module.exports = {
    report: function report (results) {
        results.forEach(function (result) {
            var output = '';

            if (result.severity === 'error') {
                output += chalk.red('Error: ');
            } else {
                output += chalk.yellow('Warning: ');
            }

            output += chalk.cyan(result.file) + ': ';

            if (result.line) {
                output += chalk.magenta('line ' + result.line) + ', ';
            }

            if (result.column) {
                output += chalk.magenta('col ' + result.column) + ', ';
            }

            output += chalk.green(result.linter) + ': ';
            output += result.message;

            console.log(output);
        });
    }
};
