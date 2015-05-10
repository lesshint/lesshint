'use strict';

var fs = require('vow-fs');
var linter = require('./linter');
var Vow = require('vow');

var Lesshint = function () {

};

Lesshint.prototype.checkDirectory = function (path) {
    return fs.listDir(path).then(function (files) {
        files = files.map(function (file) {
            var fullPath = path + '/' + file;

            return fs.stat(fullPath).then(function (stats) {
                if (stats.isDirectory()) {
                    return this.checkDirectory(fullPath);
                }

                if (file.substr(0, 1) === '.') {
                    return;
                }

                return this.checkFile(fullPath);
            }, this);
        }, this);

        return Vow.all(files).then(function (errors) {
            return [].concat.apply([], errors);
        });
    }, this);
};

Lesshint.prototype.checkFile = function (path) {
    return fs.read(path, 'utf8').then(function (data) {
        return this.checkString(data, path);
    }, this);
};

Lesshint.prototype.checkPath = function (path) {
    return fs.stat(path).then(function (stats) {
        if (stats.isDirectory()) {
            return this.checkDirectory(path);
        }

        return this.checkFile(path);
    }, this);
};

Lesshint.prototype.checkString = function (input, path) {
    return linter.lint(input, path, this.config);
};

Lesshint.prototype.configure = function (config) {
    this.config = config;
};

module.exports = Lesshint;
