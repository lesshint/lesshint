'use strict';

const expect = require('chai').expect;
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

describe('lesshint', function () {
    const testDir = path.join(path.dirname(__dirname), '/data/files');
    const Lesshint = require('../../lib/lesshint');
    const configLoader = require('../../lib/config-loader');

    describe('checkDirectory', function () {
        it('should check all files on all levels of a directory', function () {
            const lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkDirectory(testDir).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should strip trailing slashes from directory names', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/files/sub/');
            const lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result[0].fullPath).to.equal(testPath + 'file.less');
            });
        });

        it('should ignore dotfiles', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/ignored-files');
            const lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(0);
            });
        });

        it('should ignore excluded files', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                excludedFiles: ['vendor.less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(1);
            });
        });

        it('should ignore excluded folders', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                excludedFiles: ['**/excluded-files']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(0);
            });
        });

        it('should only check files with the correct extension and a leading dot', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                fileExtensions: ['.less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should only check files with the correct extension and without a leading dot', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                fileExtensions: ['less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should allow all extensions when "*" is passed', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                fileExtensions: '*'
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(3);
            });
        });

        it('should reject on inaccessible paths', function () {
            const lesshint = new Lesshint();

            lesshint.configure();

            const filePath = testDir + '/tmp.less';

            fs.writeFileSync(filePath, '');
            fs.chmodSync(filePath, 222); // Don't allow read access

            return lesshint.checkDirectory(filePath).catch(function (err) {
                expect(err).to.be.an.instanceof(Error);

                rimraf(filePath, function () {});
            });
        });
    });

    describe('checkFile', function () {
        it('should check a single file', function () {
            const lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkFile(testDir + '/file.less').then(function (result) {
                expect(result).to.have.length(1);
            });
        });

        it('should reject on inaccessible files', function () {
            const lesshint = new Lesshint();

            lesshint.configure();

            const filePath = testDir + '/tmp.less';

            fs.writeFileSync(filePath, '');
            fs.chmodSync(filePath, 222); // Don't allow read access

            return lesshint.checkFile(filePath).catch(function (err) {
                expect(err).to.be.an.instanceof(Error);

                rimraf(filePath, function () {});
            });
        });
    });

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

    describe('checkPath', function () {
        it('should check all files and directories on all levels of a path', function () {
            const lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkPath(testDir).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should ignore excluded files', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files/exclude.less');
            const lesshint = new Lesshint();
            const config = {
                excludedFiles: ['**/excluded-files/*']
            };

            lesshint.configure(config);

            return lesshint.checkPath(testPath).then(function (result) {
                expect(result).to.have.length(0);
            });
        });

        it('should ignore excluded folders', function () {
            const testPath = path.join(path.dirname(__dirname), '/data/excluded-files');
            const lesshint = new Lesshint();
            const config = {
                excludedFiles: ['**/excluded-files/*']
            };

            lesshint.configure(config);

            return lesshint.checkPath(testPath).then(function (result) {
                expect(result).to.have.length(0);
            });
        });

        it('should reject on inaccessible paths', function () {
            const lesshint = new Lesshint();

            lesshint.configure();

            const filePath = testDir + '/tmp.less';

            fs.writeFileSync(filePath, '');
            fs.chmodSync(filePath, 222); // Don't allow read access

            return lesshint.checkPath(filePath).catch(function (err) {
                expect(err).to.be.an.instanceof(Error);

                rimraf(filePath, function () {});
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
