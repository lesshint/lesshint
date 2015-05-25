var assert = require('assert');
var path = require('path');

describe('lesshint', function () {
    var testDir = path.dirname(__dirname) + '/data/files';
    var Lesshint = require('../../lib/lesshint');

    describe('checkDirectory', function () {
        it('should check all files on all levels of a directory', function () {
            var lesshint = new Lesshint();

            return lesshint.checkDirectory(testDir).then(function (errors) {
                assert.ok(errors.length === 2);
            });
        });

        it('should ignore dotfiles', function () {
            var lesshint = new Lesshint();
            var testPath = path.dirname(__dirname) + '/data/ignored-files';

            return lesshint.checkDirectory(testPath).then(function (errors) {
                assert.ok(errors.length === 0);
            });
        });
    });

    describe('checkFile', function () {
        it('should check a single file', function () {
            var lesshint = new Lesshint();

            return lesshint.checkFile(testDir + '/file.less').then(function (errors) {
                assert.ok(errors.length === 1);
            });
        });
    });

    describe('checkPath', function () {
        it('should check all files and directories on all levels of a path', function () {
            var lesshint = new Lesshint();

            return lesshint.checkPath(testDir).then(function (errors) {
                assert.ok(errors.length === 2);
            });
        });
    });

    describe('checkString', function () {
        it('should check a string', function () {
            var string = '.foo{ color: red; }\n';
            var lesshint = new Lesshint();
            var errors = lesshint.checkString(string);

            assert.ok(errors.length === 1);
        });
    });

    describe('configure', function () {
        it('should set the config to use', function () {
            var lesshint = new Lesshint();
            var expected = {
                spaceAfterPropertyColon: {
                    enabled: false,
                    style: 'one_space'
                },

                spaceBeforeBrace: {
                    enabled: true,
                    style: 'new_line'
                }
            };

            lesshint.configure(expected);

            assert.deepEqual(lesshint.config, expected);
        });
    });
});
