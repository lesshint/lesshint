'use strict';

var fs = require('vow-fs');
var linter = require('./linter');
var Vow = require('Vow');

var LessHint = function () {

};

LessHint.prototype.checkDirectory = function (path) {
    return fs.listDir(path).then(function (files) {
        return Vow.all(files.map(function(file) {
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
        }, this)).then(function(errors) {
            return [].concat.apply([], errors);
        });
    }, this);
};

LessHint.prototype.checkFile = function (path) {
    return fs.read(path, 'utf8').then(function (data) {
        return this.checkString(data, path);
    }, this);
};

LessHint.prototype.checkPath = function (path) {
    return fs.stat(path).then(function (stats) {
        if (stats.isDirectory()) {
            return this.checkDirectory(path);
        }

        return this.checkFile(path);
    }, this);
};

LessHint.prototype.checkString = function (input, path) {
    return linter.lint(input, path, this.config);
};

LessHint.prototype.configure = function (config) {
    this.config = config;
};

module.exports = LessHint;
