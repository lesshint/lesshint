'use strict';

var expect = require('chai').expect;
var path = require('path');

describe('lesshint', function () {
    var testDir = path.dirname(__dirname) + '/data/files';
    var Lesshint = require('../../lib/lesshint');
    var configLoader = require('../../lib/config-loader');

    describe('checkDirectory', function () {
        it('should check all files on all levels of a directory', function () {
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkDirectory(testDir).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should ignore dotfiles', function () {
            var testPath = path.dirname(__dirname) + '/data/ignored-files';
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(0);
            });
        });

        it('should ignore excluded files', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                excludedFiles: ['vendor.less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(1);
            });
        });

        it('should only check files with the correct extension and a leading dot', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                fileExtensions: ['.less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should only check files with the correct extension and without a leading dot', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                fileExtensions: ['less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(2);
            });
        });

        it('should allow all extensions when "*" is passed', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                fileExtensions: '*'
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (result) {
                expect(result).to.have.length(3);
            });
        });
    });

    describe('checkFile', function () {
        it('should check a single file', function () {
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkFile(testDir + '/file.less').then(function (result) {
                expect(result).to.have.length(1);
            });
        });
    });

    describe('checkPath', function () {
        it('should check all files and directories on all levels of a path', function () {
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkPath(testDir).then(function (result) {
                expect(result).to.have.length(2);
            });
        });
    });

    describe('checkString', function () {
        it('should check a string', function () {
            var source = '.foo{\n color: red;\n}\n';
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkString(source).then(function (result) {
                expect(result).to.have.length(1);
            });
        });

        it('should return an object containing an error result on invalid input', function () {
            var source = '.foo{';
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkString(source).then(function (result) {
                expect(result).to.have.length(1);
                expect(result[0]).to.have.property('severity', 'error');
            });
        });

        it('should return the name of the file containing a parse error', function () {
            var source = '.foo { border none }';
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkString(source, '/var/test/file.less').then(function (result) {
                expect(result[0]).to.have.property('file', 'file.less');
            });
        });

        it('should reject on non-parse related errors', function () {
            var config = configLoader(path.dirname(__dirname) + '/data/config/bad.json');
            var lesshint = new Lesshint();

            lesshint.configure(config);

            return lesshint.checkString().catch(function (error) {
                expect(error).to.be.an.instanceof(Error);
            });
        });
    });

    describe('configure', function () {
        it('should set the config to use', function () {
            var expected = configLoader(path.resolve(process.cwd() + '/lib/config/defaults.json'));
            var lesshint = new Lesshint();

            lesshint.configure(expected);

            expect(lesshint.config).to.deep.equal(expected);
        });
    });
});
