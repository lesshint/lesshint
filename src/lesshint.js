'use strict';

var fs = require('fs');
var gonzales = require('gonzales-pe');
var RcFinder = require('rcfinder');
var stripJsonComments = require('strip-json-comments');

var lesshint = function (path, options) {
    var config;
    var rcfinder;

    if (!options.c || !options.config) {
        rcfinder = new RcFinder('.lesshintrc', {
            loader: function (path) {
                var data = fs.readFileSync(path, 'utf8');

                data = stripJsonComments(data);

                return JSON.parse(data);
            }
        });

        config = rcfinder.find(__dirname);
    }

    console.log(config);

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
