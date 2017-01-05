/*eslint no-console: 0*/

'use strict';

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

module.exports = function (program) {
    return new Promise((resolve, reject) => {
        if (!program.args.length) {
            console.error('No files to lint were passed. See lesshint -h');

            return reject(EXIT_CODES.NOINPUT);
        }

        let config;

        try {
            config = configLoader(program.config);
            config = config || {};

            config.excludedFiles = config.excludedFiles || [];
            config.linters = config.linters || [];

            if (program.exclude) {
                config.excludedFiles.push(program.exclude);
            }

            if (program.linters) {
                config.linters.push.apply(config.linters, program.linters);
            }
        } catch (e) {
            console.error(`Something's wrong with the config file. Error: ${ e.message }`);

            return reject(EXIT_CODES.CONFIG);
        }

        const lesshint = new Lesshint();

        lesshint.configure(config);

        const promises = program.args.map(lesshint.checkPath, lesshint);
        Promise.all(promises).then((results) => {
            results = [].concat.apply([], results);

            const reporter = lesshint.getReporter(program.reporter);

            if (reporter) {
                reporter.report(results);
            } else {
                console.error(`Could not load reporter "${ program.reporter }".`);

                return reject(EXIT_CODES.CONFIG);
            }

            if (!results.length) {
                return resolve(EXIT_CODES.OK);
            }

            const hasError = results.some((result) => {
                return result.severity === 'error';
            });

            if (hasError) {
                return reject(EXIT_CODES.ERROR);
            }

            const maxWarnings = parseInt(program.maxWarnings, 10) || 0;

            if (maxWarnings === -1) {
                return resolve(EXIT_CODES.OK);
            }

            const warnings = results.reduce((sum, result) => {
                return sum + (result.severity === 'warning' ? 1 : 0);
            }, 0);

            if (warnings > maxWarnings) {
                return reject(EXIT_CODES.WARNING);
            }

            resolve(EXIT_CODES.OK);
        }).catch((error) => {
            console.error(`An unknown error occurred when checking "${ error.lesshintFile }", please file an issue with this info:`);
            console.error(error.stack);

            reject(EXIT_CODES.SOFTWARE);
        });
    });
};
