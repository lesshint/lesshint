'use strict';

const expect = require('chai').expect;
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

describe('config-loader', function () {
    const configLoader = require('../../lib/config-loader');

    it('should load the specified config file', function () {
        const config = path.resolve(process.cwd(), './test/data/config/config.json');
        const expected = {
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

        const result = configLoader(config);
        delete result.configPath;

        expect(result).to.deep.equal(expected);
    });

    it('should load .lesshintrc if no config file is passed', function () {
        const filePath = path.resolve(process.cwd(), './.lesshintrc');
        const expected = {
            spaceBeforeBrace: {
                enabled: true,
                style: 'one_space'
            }
        };

        fs.writeFileSync(filePath, JSON.stringify(expected));

        const result = configLoader();
        delete result.configPath;

        expect(result).to.deep.equal(expected);

        rimraf(filePath, function () {});
    });

    it('should strip BOM from config files', function () {
        const config = path.resolve(process.cwd(), './test/data/config/bom.json');
        const loader = configLoader.bind(null, config);

        expect(loader).to.not.throw(Error);
    });

    it('should load a config file when passed one', function () {
        const configPath = path.join(path.dirname(__dirname), '/data/config/config.json');
        const expected = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const config = configLoader(configPath);
        delete config.configPath;

        expect(config).to.deep.equal(expected);
    });

    it('should look for a .lesshintrc file when passed a directory', function () {
        const configPath = path.resolve(__dirname, '../.lesshintrc');
        const expected = {
            spaceBeforeBrace: {
                enabled: true,
                style: 'one_space'
            }
        };

        fs.writeFileSync(configPath, JSON.stringify(expected));

        const result = configLoader(__dirname);
        delete result.configPath;

        expect(result).to.deep.equal(expected);

        rimraf.sync(configPath);
    });
});
