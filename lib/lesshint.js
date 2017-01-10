'use strict';

const configLoader = require('./config-loader');
const minimatch = require('minimatch');
const merge = require('lodash.merge');
const linter = require('./linter');
const path = require('path');
const fs = require('vow-fs');
const Vow = require('vow');

class Lesshint {
    checkDirectory (checkPath) {
        if (this.isExcluded(checkPath)) {
            return new Vow.Promise(function (resolve) {
                resolve([]);
            });
        }

        return fs.listDir(checkPath).then(function (files) {
            files = files.map(function (file) {
                const fullPath = path.join(checkPath, file);

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
    }

    checkFile (checkPath) {
        return fs.read(checkPath, 'utf8').then(function (data) {
            return this.checkString(data, checkPath);
        }, this);
    }

    checkPath (checkPath) {
        if (this.isExcluded(checkPath)) {
            return new Vow.Promise(function (resolve) {
                resolve([]);
            });
        }

        return fs.stat(checkPath).then(function (stats) {
            if (stats.isDirectory()) {
                return this.checkDirectory(checkPath);
            }

            return this.checkFile(checkPath);
        }, this);
    }

    checkString (input, checkPath) {
        let result;

        try {
            checkPath = checkPath || '';
            result = linter.lint(input, checkPath, this.config);
        } catch (e) {
            if (e.name !== 'CssSyntaxError') {
                /**
                * Unkown error, i.e. not thrown by PostCSS.
                * Reject and let someone else handle it.
                */
                throw e;
            }

            // We just emit parse errors as regular errors
            result = [{
                column: e.column,
                file: path.basename(checkPath),
                fullPath: checkPath,
                line: e.line,
                linter: 'parse error',
                message: e.reason,
                severity: linter.resultSeverity.error
            }];
        }

        return result;
    }

    configure (config) {
        const defaultConfig = configLoader(__dirname + '/config/defaults.json');

        this.config = merge(defaultConfig, config);
    }

    hasAllowedExtension (file) {
        if (!Array.isArray(this.config.fileExtensions) || this.config.fileExtensions === '*') {
            return true;
        }

        // Make sure there is a leading dot
        const fileExtensions = this.config.fileExtensions.map(function (extension) {
            return '.' + extension.replace(/^\./, '');
        });

        return fileExtensions.indexOf(path.extname(file)) !== -1;
    }

    isExcluded (checkPath) {
        return this.config.excludedFiles.some(function (pattern) {
            return minimatch(checkPath, pattern, {
                matchBase: true
            });
        });
    }

    getConfig (path) {
        const config = configLoader(path);

        return config;
    }

    getReporter (reporter) {
        // Nothing defined, just fall back to our simple default
        if (!reporter || reporter === 'default') {
            const reporterPath = path.resolve(__dirname, './reporters/default');

            return require(reporterPath);
        }

        // Object with .report as a method: return it directly
        if (reporter.constructor !== 'string' && reporter.report) {
            return reporter;
        }

        // Try to find it somewhere on disk
        try {
            const reporterPath = path.resolve(process.cwd(), reporter);

            return require(reporterPath);
        } catch (e) {
            // Empty
        }

        // Try to load it as a module
        try {
            return require(reporter);
        } catch (e) {
            // Empty
        }

        return false;
    }
}

module.exports = Lesshint;
