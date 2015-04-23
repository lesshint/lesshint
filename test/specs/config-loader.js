var assert = require('assert');
var mock = require('mock-fs');
var path = require('path');

describe('config-loader', function () {
    var configLoader = require('../../lib/config-loader');
    var expectedMock = {
        spaceBeforeBrace: {
            enabled: true,
            style: 'no_space'
        }
    };

    after(function () {
        mock.restore();
    });

    it('should load the specified config file', function () {
        var config = path.resolve(process.cwd() + '/test/data/config/config.json');
        var actual = configLoader(config);
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

        assert.deepEqual(actual, expected);
    });

    it('should load .lesshintrc if no config file is passed', function () {
        var actual;

        mock({
            '/.lesshintrc': JSON.stringify(expectedMock)
        });

        actual = configLoader();

        assert.deepEqual(actual, expectedMock);
    });
});
