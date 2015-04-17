'use strict';

var fs = require('vow-fs');
var linter = require('./linter');

var Checker = function Checker () {

};

Checker.prototype.checkDirectory = function checkDirectory (path) {
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

Checker.prototype.checkFile = function checkFile (path) {
    return fs.read(path, 'utf8').then(function (data) {
        linter.lint(data, this.config);
    }, this);
};

Checker.prototype.checkPath = function checkPath (path) {
    return fs.stat(path).then(function (stats) {
        if (stats.isDirectory()) {
            return this.checkDirectory(path);
        }

        return this.checkFile(path);
    }, this);
};

Checker.prototype.configure = function configure (config) {
    this.config = config;
};

module.exports = Checker;
