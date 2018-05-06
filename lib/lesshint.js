'use strict';

const LesshintError = require('./errors/lesshint-error');
const pluginLoader = require('./plugin-loader');
const configLoader = require('./config-loader');
const merge = require('lodash.merge');
const Linter = require('./linter');
const globby = require('globby');
const path = require('path');
const fs = require('fs');

class Lesshint {
    checkFiles (patterns) {
        return new Promise((resolve, reject) => {
            const ignorePatterns = this.config.excludedFiles.map((pattern) => {
                return `!${ pattern }`;
            });

            patterns = patterns.concat(ignorePatterns);

            const extensions = this.config.fileExtensions.map(this.stripExtensionDot);
            const globbyOptions = {
                expandDirectories: {
                    extensions,
                },
            };

            globby(patterns, globbyOptions)
                .then((files) => {
                    files = files.filter(this.hasAllowedExtension, this);
                    files = files.map((file) => {
                        return this.runOnFile(file);
                    });

                    this.formatResults(files, resolve, reject);
                })
                .catch((error) => {
                    error = new LesshintError(error, error.path);

                    reject(error);
                });
        });
    }

    checkString (input, checkPath = '') {
        let result;

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

    runOnFile (checkPath) {
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

    configure (config) {
        const defaultConfig = configLoader(__dirname + '/config/defaults.json');

        this.config = merge(defaultConfig, config);

        return this.config;
    }

    hasAllowedExtension (file) {
        if (!Array.isArray(this.config.fileExtensions) || this.config.fileExtensions === '*') {
            return true;
        }

        // Make sure there is a leading dot
        const fileExtensions = this.config.fileExtensions.map((extension) => {
            return `.${ this.stripExtensionDot(extension) }`;
        });

        return fileExtensions.includes(path.extname(file));
    }

    stripExtensionDot (extension) {
        return extension.replace(/^\./, '');
    }

    formatResults (files, resolve, reject) {
        Promise.all(files)
            .then((results) => {
                results = [].concat.apply([], results);

                resolve(results);
            })
            .catch((error) => {
                error = new LesshintError(error, error.path);

                reject(error);
            });
    }

    getConfig (path) {
        const config = configLoader(path);

        return config;
    }

    getReporter (reporter = 'default') {
        // Nothing defined, just fall back to our simple default
        if (reporter === 'default') {
            const reporterPath = path.resolve(__dirname, './reporters/default');

            return require(reporterPath);
        }

        try {
            return pluginLoader(reporter);
        } catch (e) {
            return false;
        }
    }
}

module.exports = Lesshint;
