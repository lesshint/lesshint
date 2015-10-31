'use strict';

var assert = require('assert');
var rimraf = require('rimraf');
var path = require('path');
var fs = require('fs');

describe('config-loader', function () {
    var configLoader = require('../../lib/config-loader');

    it('should load the specified config file', function () {
        var config = path.resolve(process.cwd(), './test/data/config/config.json');
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
        var filePath = path.resolve(process.cwd(), './.lesshintrc');
        var actual;

        var expected = {
            spaceBeforeBrace: {
                enabled: true,
                style: 'one_space'
            }
        };

        fs.writeFileSync(filePath, JSON.stringify(expected));

        actual = configLoader();

        assert.deepEqual(actual, expected);

        rimraf(filePath, function () {});
    });

    it('should strip BOM from config files', function () {
        var config = path.resolve(process.cwd(), './test/data/config/bom.json');

        try {
            configLoader(config);

            assert(true);
        } catch (e) {
            assert(false);
        }
    });
});
