'use strict';

var path = require('path');
var getParser = require('../../lib/linter').getParser;

module.exports = {
    setup: function setup () {
        var filename = '../../lib/linters/';
        var linter;

        // slightly evil, but it's OK since this is just for specs
        // nodejs caches module.parent as the first module to require it,
        // which in the case of specs, is mocha.
        // we want the linter that is requiring this, for each.
        delete require.cache[__filename];

        filename = path.join(filename, path.basename(module.parent.filename));

        try {
            linter = require(filename);
        } catch (e) {
            return {};
        }

        return {
            linter: linter,
            parser: getParser,
            parse: function (source, callback) {
                return getParser(source).then(function (ast) {
                    callback && callback(ast);
                });
            }
        };
    }
};
