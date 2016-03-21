'use strict';

var path = require('path');
var getParser = require('../../lib/linter').getParser;

module.exports = {
    setup: function setup () {
        var filename = path.basename(module.parent.filename);

        return {
            linter: require('../../lib/linters/' + filename),
            parser: getParser,
            parse: function (source, callback) {
                return getParser(source).then(function (ast) {
                    callback && callback(ast);
                });
            }
        };
    }
};
