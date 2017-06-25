/*eslint no-console: 0*/

'use strict';

const childProcess = require('child_process');
const expect = require('chai').expect;
const path = require('path');

const awaitExit = function (exitingProcess) {
    return new Promise((resolve) => {
        exitingProcess.once('exit', resolve);
    });
};

const assertCode = function (exitingProcess, expectedCode) {
    return awaitExit(exitingProcess).then((exitCode) => {
        expect(exitCode).to.equal(expectedCode);
    });
};

describe('bin/lesshint', () => {
    const execPath = path.resolve(__dirname, '../../../bin/lesshint');

    const runLesshint = function (args) {
        return childProcess.fork(execPath, args, {
            silent: true
        });
    };

    it('should exit with 0 when everything is alright', function () {
        const filePath = path.resolve(__dirname, '../../data/files/ok.less');
        const child = runLesshint([filePath]);

        return assertCode(child, 0);
    });


    it('should exit with 0 when warnings are found', function () {
        const filePath = path.resolve(__dirname, '../../data/files/file.less');
        const child = runLesshint([filePath]);

        return assertCode(child, 0);
    });

    it('should exit with 1 when errors are found', function () {
        const configPath = path.resolve(__dirname, '../../data/config/severity-error.json');
        const filePath = path.resolve(__dirname, '../../data/files/file.less');
        const child = runLesshint([`--config=${ configPath }`, filePath]);

        return assertCode(child, 1);
    });

    it('should exit with 78 when passed an invalid config file', function () {
        const configPath = path.resolve(__dirname, '../../data/config/invalid.json');
        const filePath = path.resolve(__dirname, '../../data/files/ok.less');
        const child = runLesshint([`--config=${ configPath }`, filePath]);

        return assertCode(child, 78);
    });
});
