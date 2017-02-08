'use strict';

const RunnerError = require('./errors/runner-error');
const configLoader = require('./config-loader');
const Lesshint = require('./lesshint');

const EXIT_CODES = {
    OK: 0,
    WARNING: 1,
    ERROR: 2,
    NOINPUT: 66,
    SOFTWARE: 70,
    CONFIG: 78
};

class Runner {
    constructor (options) {
        this.options = options;
    }

    run () {
        return new Promise((resolve, reject) => {
            if (!this.options.args.length) {
                return reject(new RunnerError(
                    'No files to lint were passed. See lesshint -h',
                    EXIT_CODES.NOINPUT
                ));
            }

            let config;

            try {
                config = configLoader(this.options.config);
                config = config || {};

                config.excludedFiles = config.excludedFiles || [];
                config.linters = config.linters || [];

                if (this.options.exclude) {
                    config.excludedFiles.push(this.options.exclude);
                }

                if (this.options.linters) {
                    config.linters.push(this.options.linters);
                }
            } catch (e) {
                return reject(new RunnerError(
                    `Something's wrong with the config file. Error: ${ e.message }`,
                    EXIT_CODES.CONFIG
                ));
            }

            const lesshint = new Lesshint();

            lesshint.configure(config);

            const promises = this.options.args.map(lesshint.checkPath, lesshint);
            const reporter = lesshint.getReporter(this.options.reporter);

            if (!reporter) {
                return reject(new RunnerError(
                    `Could not load reporter "${ this.options.reporter }".`,
                    EXIT_CODES.CONFIG
                ));
            }

            Promise.all(promises).then((results) => {
                results = [].concat.apply([], results);

                reporter.report(results);

                if (!results.length) {
                    return resolve({
                        status: EXIT_CODES.OK
                    });
                }

                const hasError = results.some((result) => {
                    return result.severity === 'error';
                });

                if (hasError) {
                    return reject(new RunnerError(
                        '',
                        EXIT_CODES.ERROR
                    ));
                }

                let maxWarnings;

                if (isFinite(this.options.maxWarnings)) {
                    maxWarnings = parseInt(this.options.maxWarnings, 10) || 0;
                } else {
                    maxWarnings = new Boolean(this.options.maxWarnings) ? 0 : -1;
                }

                if (maxWarnings === -1) {
                    return resolve({
                        status: EXIT_CODES.OK
                    });
                }

                const warnings = results.reduce((sum, result) => {
                    return sum + (result.severity === 'warning' ? 1 : 0);
                }, 0);

                if (warnings > maxWarnings) {
                    return reject(new RunnerError(
                        '',
                        EXIT_CODES.WARNING
                    ));
                }

                return resolve({
                    status: EXIT_CODES.OK
                });
            }).catch((error) => {
                const message = [
                    `An unknown error occurred when checking "${ error.path }", please file an issue with this info:`,
                    error.stack
                ].join('\n');

                reject(new RunnerError(
                    message,
                    EXIT_CODES.SOFTWARE
                ));
            });
        });
    }
}

module.exports = Runner;
