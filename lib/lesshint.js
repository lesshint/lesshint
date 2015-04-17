'use strict';

var fs = require('vow-fs');
var linter = require('./linter');

var LessHint = function () {

};

LessHint.prototype.checkDirectory = function (path) {
    return fs.listDir(path).then(function (files) {
        return files.forEach(function (file) {
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
    }, this);
};

LessHint.prototype.checkFile = function (path) {
    return fs.read(path, 'utf8').then(function (data) {
        return this.checkString(data);
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

LessHint.prototype.checkString = function (input) {
    return linter.lint(input, this.config);
};

LessHint.prototype.configure = function (config) {
    this.config = config;
};

module.exports = LessHint;
