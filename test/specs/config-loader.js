'use strict';

var expect = require('chai').expect;
var rimraf = require('rimraf');
var path = require('path');
var fs = require('fs');

describe('config-loader', function () {
    var configLoader = require('../../lib/config-loader');

    it('should load the specified config file', function () {
        var config = path.resolve(process.cwd(), './test/data/config/config.json');
        var result;

        var expected = {
            excludedFiles: ['vendor.less', 'exclude-me-too.less'],

            spaceAfterPropertyColon: {
                enabled: false,
                style: 'one_space'
            },

            spaceBeforeBrace: {
                enabled: true,
                style: 'new_line'
            }
        };

        result = configLoader(config);

        expect(result).to.deep.equal(expected);
    });

    it('should load .lesshintrc if no config file is passed', function () {
        var filePath = path.resolve(process.cwd(), './.lesshintrc');
        var result;

        var expected = {
            spaceBeforeBrace: {
                enabled: true,
                style: 'one_space'
            }
        };

        fs.writeFileSync(filePath, JSON.stringify(expected));

        result = configLoader();

        expect(result).to.deep.equal(expected);

        rimraf(filePath, function () {});
    });

    it('should strip BOM from config files', function () {
        var config = path.resolve(process.cwd(), './test/data/config/bom.json');
        var loader = configLoader.bind(null, config);

        expect(loader).to.not.throw(Error);
    });
});
