'use strict';

var configLoader = require('./config-loader');
var minimatch = require('minimatch');
var merge = require('lodash.merge');
var linter = require('./linter');
var path = require('path');
var fs = require('vow-fs');
var Vow = require('vow');

var Lesshint = function () {

};

Lesshint.prototype.checkDirectory = function (checkPath) {
    return fs.listDir(checkPath).then(function (files) {
        files = files.map(function (file) {
            var fullPath = checkPath + '/' + file;

            return fs.stat(fullPath).then(function (stats) {
                if (stats.isDirectory()) {
                    return this.checkDirectory(fullPath);
                }

                // Check if the file should be excluded
                if (this.isExcluded(fullPath)) {
                    return [];
                }

                // Check if the file has the correct extension
                if (!this.hasAllowedExtension(file)) {
                    return [];
                }

                return this.checkFile(fullPath);
            }, this);
        }, this);

        return Vow.all(files).then(function (results) {
            return [].concat.apply([], results);
        });
    }, this);
};

Lesshint.prototype.checkFile = function (checkPath) {
    return fs.read(checkPath, 'utf8').then(function (data) {
        return this.checkString(data, checkPath);
    }, this);
};

Lesshint.prototype.checkPath = function (checkPath) {
    return fs.stat(checkPath).then(function (stats) {
        if (stats.isDirectory()) {
            return this.checkDirectory(checkPath);
        }

        return this.checkFile(checkPath);
    }, this);
};

Lesshint.prototype.checkString = function (input, checkPath) {
    var lineNo = 0;
    var matches;
    var result;

    try {
        result = linter.lint(input, checkPath, this.config);
    } catch (e) {
        if (e.name !== 'Parsing error') {
            /**
             * Unkown error, i.e. not thrown by gonzales-pe.
             * Rethrow and let someone else handle it.
             */
            throw e;
        }

        matches = (e.message || e).match(/\#(\d+)$/);

        /**
         * lineNo should never be 0, but in the event that gonzales-pe
         * throws a different message, let's account for it. I couldn't
         * find any instance that this would happen.
         */
        if (matches && matches.length > 1) {
            lineNo = parseInt(matches[1]);
        }

        result = [{
            /**
             * Errors from gonzales-pe only return line number at the moment,
             * so we can safely assume column 1, as the entire line is affected.
             */
            column: 1,
            file: path.basename(checkPath),
            line: lineNo,
            linter: 'parse error',
            message: e.message || e,
            severity: linter.resultSeverity.error
        }];
    }

    return result;
};

Lesshint.prototype.configure = function (config) {
    var defaultConfig = configLoader(__dirname + '/config/defaults.json');

    this.config = merge(defaultConfig, config);
};

Lesshint.prototype.hasAllowedExtension = function (file) {
    var fileExtensions;

    if (!Array.isArray(this.config.fileExtensions) || this.config.fileExtensions === '*') {
        return true;
    }

    // Make sure there is a leading dot
    fileExtensions = this.config.fileExtensions.map(function (extension) {
        return '.' + extension.replace(/^\./, '');
    });

    return fileExtensions.indexOf(path.extname(file)) !== -1;
};

Lesshint.prototype.isExcluded = function (checkPath) {
    return this.config.excludedFiles.some(function (pattern) {
        return minimatch(checkPath, pattern, {
            matchBase: true
        });
    });
};

module.exports = Lesshint;
