'use strict';

const { expect } = require('chai');
const path = require('path');

describe('lesshint', function () {
    const Lesshint = require('../../lib/lesshint');
    const configLoader = require('../../lib/config-loader');

    describe('checkFiles', function () {
        const glob = path.join(path.dirname(__dirname), '/data/files/**/*.less');

        it('should check all files matched by glob', function () {
            const lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkFiles(glob).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should ignore excluded folders', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                excludedFiles: ['**/excluded-files']
            };

            lesshint.configure(config);

            return lesshint.checkFiles(testPath).then(function (result) {
                expect(result).to.have.length(0);
            });
        });

        it('should only check files with the correct extension', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                fileExtensions: ['.less']
            };

            lesshint.configure(config);

            return lesshint.checkFiles(testPath).then(function (result) {
                expect(result).to.have.length(2);
            });
        });
    });

    describe('checkString', function () {
        it('should check a string', function () {
            const string = '.foo{\n color: red;\n}\n';
            const lesshint = new Lesshint();

            lesshint.configure();

            const result = lesshint.checkString(string);

            expect(result).to.have.length(1);
        });

        it('should return an object containing an error result on invalid input', function () {
            const lesshint = new Lesshint();
            const source = '.foo{';

            lesshint.configure();

            const result = lesshint.checkString(source);

            expect(result).to.have.length(1);
            expect(result[0]).to.have.property('severity', 'error');
        });

        it('should return the name of the file containing a parse error', function () {
            const string = '.foo { border none }';
            const lesshint = new Lesshint();

            lesshint.configure();

            const result = lesshint.checkString(string, '/var/test/file.less');

            expect(result[0]).to.have.property('file', 'file.less');
        });

        it('should throw on non-parse related errors', function () {
            const config = configLoader(path.join(path.dirname(__dirname), '/data/config/bad.json'));
            const lesshint = new Lesshint();

            lesshint.configure(config);

            const checker = lesshint.checkString.bind(null);

            expect(checker).to.throw(Error);
        });
    });

    describe('configure', function () {
        it('should set the config to use', function () {
            const expected = configLoader(path.resolve(process.cwd() + '/lib/config/defaults.json'));
            const lesshint = new Lesshint();

            lesshint.configure(expected);

            expect(lesshint.config).to.deep.equal(expected);
        });

        it('should return the final config object', function () {
            const expected = configLoader(path.resolve(process.cwd() + '/lib/config/defaults.json'));
            const lesshint = new Lesshint();

            expect(lesshint.configure(expected)).to.deep.equal(expected);
        });
    });

    describe('getConfig', function () {
        it('should load the specified config file', function () {
            const configPath = path.join(path.dirname(__dirname), '/data/config/config.json');
            const expected = configLoader(configPath);
            const lesshint = new Lesshint();
            const config = lesshint.getConfig(configPath);

            expect(config).to.deep.equal(expected);
        });
    });

    describe('getReporter', function () {
        it('should load the specified reporter by path', function () {
            const lesshint = new Lesshint();
            const reporter = lesshint.getReporter(path.resolve(process.cwd() + '/lib/reporters/default.js'));

            expect(reporter.name).to.equal('default');
        });

        it('should load the specified reporter directly', function () {
            const lesshint = new Lesshint();
            const reporter = lesshint.getReporter({
                name: 'test',
                report: function () {}
            });

            expect(reporter.name).to.equal('test');
        });

        it('should load the default when nothing is passed', function () {
            const lesshint = new Lesshint();
            const reporter = lesshint.getReporter();

            expect(reporter.name).to.equal('default');
        });

        it('should return false when no reporter was found', function () {
            const lesshint = new Lesshint();
            const reporter = lesshint.getReporter('invalid');

            expect(reporter).to.be.false;
        });
    });
});
