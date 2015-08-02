'use strict';

var chalk = require('chalk');

module.exports = function (errors) {
    errors.forEach(function (error) {
        var output = '';

        output += chalk.cyan(error.file) + ': ';

        if (error.line) {
            output += chalk.magenta('line ' + error.line) + ', ';
        }

        if (error.column) {
            output += chalk.magenta('col ' + error.column) + ', ';
        }

        output += chalk.green(error.linter) + ': ';
        output += error.message;

        console.log(output);
    });
};
