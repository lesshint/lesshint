'use strict';

const Linter = require('../../lib/linter');
const path = require('path');

module.exports = {
    setup: function setup () {
        /**
         * Slightly evil, but it's OK since this is just for specs
         * nodejs caches module.parent as the first module to require it,
         * which in the case of specs, is mocha.
         * We want the linter that is requiring this, for each.
         */
        delete require.cache[__filename];

        const filename = path.join('../../lib/linters/', path.basename(module.parent.filename));
        const linter = new Linter('', '', {});
        let rule;

        try {
            rule = require(filename);
        } catch (e) {
            return {};
        }

        return {
            linter: rule,
            parser: linter.parse,
            parse: function (source, callback) {
                return linter.parse(source).then(function (ast) {
                    callback && callback(ast);
                });
            }
        };
    }
};
