/*eslint no-console: 0*/

'use strict';

const configLoader = require('./config-loader');
const Lesshint = require('./lesshint');
const Vow = require('vow');

const EXIT_CODES = {
    OK: 0,
    WARNING: 1,
    ERROR: 2,
    NOINPUT: 66,
    SOFTWARE: 70,
    CONFIG: 78
};

module.exports = function (program) {
    const exitDefer = Vow.defer();
    const exitPromise = exitDefer.promise();

    if (!program.args.length) {
        console.error('No files to lint were passed. See lesshint -h');

        exitDefer.reject(EXIT_CODES.NOINPUT);

        return exitPromise;
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

        exitDefer.reject(EXIT_CODES.CONFIG);

        return exitPromise;
    }

    const lesshint = new Lesshint();

    lesshint.configure(config);

    const promises = program.args.map(lesshint.checkPath, lesshint);
    Vow.all(promises).then((results) => {
        results = [].concat.apply([], results);

        const reporter = lesshint.getReporter(program.reporter);

        if (reporter) {
            reporter.report(results);
        } else {
            console.error(`Could not find reporter "${ program.reporter }".`);
        }

        if (!results.length) {
            exitDefer.resolve(EXIT_CODES.OK);

            return;
        }

        const hasError = results.some((result) => {
            return result.severity === 'error';
        });

        if (hasError) {
            exitDefer.reject(EXIT_CODES.ERROR);
        } else {
            const maxWarnings = parseInt(program.maxWarnings, 10) || 0;

            if (maxWarnings === -1) {
                exitDefer.resolve(EXIT_CODES.OK);

                return;
            }

            const warnings = results.reduce((sum, result) => {
                return sum + (result.severity === 'warning' ? 1 : 0);
            }, 0);

            if (warnings > maxWarnings) {
                exitDefer.reject(EXIT_CODES.WARNING);
            } else {
                exitDefer.resolve(EXIT_CODES.OK);
            }
        }
    }).fail((error) => {
        console.error(`An unknown error occurred when checking "${ error.lesshintFile }", please file an issue with this info:`);
        console.error(error.stack);

        exitDefer.reject(EXIT_CODES.SOFTWARE);
    });

    return exitPromise;
};
