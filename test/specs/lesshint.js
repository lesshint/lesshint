'use strict';

var assert = require('assert');
var path = require('path');

describe('lesshint', function () {
    var testDir = path.dirname(__dirname) + '/data/files';
    var Lesshint = require('../../lib/lesshint');
    var configLoader = require('../../lib/config-loader');

    describe('checkDirectory', function () {
        it('should check all files on all levels of a directory', function () {
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkDirectory(testDir).then(function (errors) {
                assert.ok(errors.length === 2);
            });
        });

        it('should ignore dotfiles', function () {
            var testPath = path.dirname(__dirname) + '/data/ignored-files';
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkDirectory(testPath).then(function (errors) {
                assert.ok(errors.length === 0);
            });
        });

        it('should ignore excluded files', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                excludedFiles: ['vendor.less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (errors) {
                assert.ok(errors.length === 0);
            });
        });

        it('should only check files with the correct extension and a leading dot', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                fileExtensions: ['.less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (errors) {
                assert.ok(errors.length === 1);
            });
        });

        it('should only check files with the correct extension and without a leading dot', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                fileExtensions: ['less']
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (errors) {
                assert.ok(errors.length === 1);
            });
        });

        it('should allow all extensions when "*" is passed', function () {
            var testPath = path.dirname(__dirname) + '/data/excluded-files';
            var lesshint = new Lesshint();
            var config = {
                fileExtensions: '*'
            };

            lesshint.configure(config);

            return lesshint.checkDirectory(testPath).then(function (errors) {
                assert.ok(errors.length === 2);
            });
        });
    });

    describe('checkFile', function () {
        it('should check a single file', function () {
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkFile(testDir + '/file.less').then(function (errors) {
                assert.ok(errors.length === 1);
            });
        });
    });

    describe('checkPath', function () {
        it('should check all files and directories on all levels of a path', function () {
            var lesshint = new Lesshint();

            lesshint.configure();

            return lesshint.checkPath(testDir).then(function (errors) {
                assert.ok(errors.length === 2);
            });
        });
    });

    describe('checkString', function () {
        it('should check a string', function () {
            var string = '.foo{\n color: red;\n}\n';
            var lesshint = new Lesshint();
            var errors;

            lesshint.configure();

            errors = lesshint.checkString(string);

            assert.ok(errors.length === 1);
        });

        it('should return an object containing an error result on invalid input', function () {
            var string = '.foo{';

            var lesshint = new Lesshint();
            var results;

            lesshint.configure();

            results = lesshint.checkString(string);

            assert.ok(results.length === 1);
            assert.ok(results[0].severity === 'error');
        });

        it('should return the name of the file containing a parse error', function () {
            var string = '.foo { border none }';
            var lesshint = new Lesshint();
            var results;

            lesshint.configure();

            results = lesshint.checkString(string, '/var/test/file.less');

            assert.ok(results[0].file === 'file.less');
        });

        it('should throw on non-parse related errors', function () {
            var config = configLoader(path.dirname(__dirname) + '/data/config/bad.json');
            var lesshint = new Lesshint();

            lesshint.configure(config);

            assert.throws(lesshint.checkString.bind(null), Error);
        });
    });

    describe('configure', function () {
        it('should set the config to use', function () {
            var expected = configLoader(path.resolve(process.cwd() + '/lib/config/defaults.json'));
            var lesshint = new Lesshint();

            lesshint.configure(expected);

            assert.deepEqual(lesshint.config, expected);
        });
    });
});
