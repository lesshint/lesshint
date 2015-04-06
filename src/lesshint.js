'use strict';

var fs = require('fs');
var gonzales = require('gonzales-pe');
var RcFinder = require('rcfinder');
var stripJsonComments = require('strip-json-comments');

var loadConfig = function loadConfig (path) {
    var data = fs.readFileSync(path, 'utf8');

    data = stripJsonComments(data);

    return JSON.parse(data);
};

module.exports = function lesshint (path, options) {
    var config;
    var rcfinder;
    var linters = [
        require('./linters/space_before_brace')
    ];

    // Check if a config file is passed and try to load it, otherwise try and find one
    if (options.c || options.config) {
        config = options.c || options.config;
        config = loadConfig(config);
    } else {
        rcfinder = new RcFinder('.lesshintrc', {
            loader: loadConfig
        });

        config = rcfinder.find(__dirname);
    }

    fs.readFile(path, 'utf8', function fileLoader (err, data) {
        var ast;

        if (err) {
            throw err;
        }

        ast = gonzales.parse(data, {
            syntax: 'less'
        });

        ast.map(function runLinter (node) {
            var i;

            for (i = 0; i < linters.length; i++) {
                linters[i].call(null, node, config);
            }
        });
    });
};
