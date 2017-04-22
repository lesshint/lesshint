'use strict';

const LesshintError = require('./errors/lesshint-error');
const configLoader = require('./config-loader');
const minimatch = require('minimatch');
const merge = require('lodash.merge');
const Linter = require('./linter');
const path = require('path');
const fs = require('fs');

class Lesshint {
    checkDirectory (checkPath) {
        return new Promise((resolve, reject) => {
            if (this.isExcluded(checkPath)) {
                return resolve([]);
            }

            fs.readdir(checkPath, (err, files) => {
                if (err) {
                    return reject(err);
                }

                files = files.map((file) => {
                    const fullPath = path.join(checkPath, file);

                    return new Promise((resolve, reject) => {
                        fs.stat(fullPath, (err, stats) => {
                            if (err) {
                                return reject(err);
                            }

                            if (stats.isDirectory()) {
                                return resolve(this.checkDirectory(fullPath));
                            }

                            // Check if the file should be excluded
                            if (this.isExcluded(fullPath)) {
                                return resolve([]);
                            }

                            // Check if the file has the correct extension
                            if (!this.hasAllowedExtension(file)) {
                                return resolve([]);
                            }

                            resolve(this.checkFile(fullPath));
                        });
                    });
                });

                Promise.all(files)
                    .then((results) => {
                        results = [].concat.apply([], results);

                        resolve(results);
                    })
                    .catch((error) => {
                        error = new LesshintError(error, error.path);

                        reject(error);
                    });
            });
        });
    }

    checkFile (checkPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(checkPath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                try {
                    resolve(this.checkString(data, checkPath));
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    checkPath (checkPath) {
        return new Promise((resolve, reject) => {
            if (this.isExcluded(checkPath)) {
                return resolve([]);
            }

            fs.stat(checkPath, (err, stats) => {
                if (err) {
                    return reject(err);
                }

                if (stats.isDirectory()) {
                    return resolve(this.checkDirectory(checkPath));
                }

                resolve(this.checkFile(checkPath));
            });
        });
    }

    checkString (input, checkPath) {
        let result;

        checkPath = checkPath || '';

        try {
            const linter = new Linter(input, checkPath, this.config);

            result = linter.lint();
        } catch (e) {
            if (e.name !== 'CssSyntaxError') {
                /**
                * Unkown error, i.e. not thrown by PostCSS.
                * Reject and let someone else handle it.
                */
                throw new LesshintError(e, checkPath);
            }

            // We just emit parse errors as regular errors
            result = [{
                column: e.column,
                file: path.basename(checkPath),
                fullPath: checkPath,
                line: e.line,
                linter: 'parse error',
                message: e.reason,
                severity: 'error'
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
