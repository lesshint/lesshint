'use strict';

var path = require('path');
var getParser = require('../../lib/linter').getParser;

module.exports = {
    setup: function setup () {
        var filename = '../../lib/linters/';
        var linter;

        // tests selectors for pseudo classes/selectors. eg. :not(), :active
        var rPseudo = /::?[^ ,:.]+/g;

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
                    // if we're dealing with a regular Rule (or other) node, which isn't
                    // an actual Mixin or AtRule, and its selector contains a pseudo
                    // class or selector, then clean up the raws and params properties.
                    // if we don't have this here, then the tests never get the same
                    // modified nodes.
                    // tracking: https://github.com/webschik/postcss-less/issues/56
                    // TODO: remove this when issue resolved
                    ast.root.walk(function (node) {
                        if (node.params && rPseudo.test(node.selector)) {
                            delete node.params;

                            // this just started showing up in postcss-less@0.14.0. not sure
                            // if it's sticking around, but making sure we're thorough.
                            if (node.raws.params) {
                                delete node.raws.params;
                            }
                        }
                    });

                    callback && callback(ast);
                });
            }
        };
    }
};
