var assert = require('assert');
var path = require('path');

describe('config-loader', function () {
    var configLoader = require('../../lib/config-loader');

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

    it('should just use the defaults if no other config file is specified', function () {
        var expected = require(path.resolve(process.cwd() + '/lib/config/defaults.json'));
        var actual = configLoader();

        assert.deepEqual(actual, expected);
    });
});
