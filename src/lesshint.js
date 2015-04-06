'use strict';

var fs = require('fs');
var gonzales = require('gonzales-pe');

var lesshint = function (path) {
    fs.readFile(path, 'utf8', function (err, data) {
        var result;

        if (err) {
            throw err;
        }

        result = gonzales.parse(data, {
            syntax: 'less'
        });

        console.log(result);
    });
};

module.exports = lesshint;
