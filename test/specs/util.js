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

        // Tests selectors for pseudo classes/selectors. eg. :not(), :active
        const rPseudo = /::?[^ ,:.]+/g;

        return {
            linter: rule,
            parser: linter.parse,
            parse: function (source, callback) {
                return linter.parse(source).then(function (ast) {
                    /**
                     * If we're dealing with a regular Rule (or other) node, which isn't
                     * an actual Mixin or AtRule, and its selector contains a pseudo
                     * class or selector, then clean up the raws and params properties.
                     * If we don't have this here, then the tests never get the same
                     * modified nodes.
                     * Tracking: https://github.com/webschik/postcss-less/issues/56
                     * TODO: remove this when issue resolved
                     */
                    ast.root.walk(function (node) {
                        if (node.params && rPseudo.test(node.selector)) {
                            delete node.params;

                            /**
                             * This just started showing up in postcss-less@0.14.0. not sure
                             * if it's sticking around, but making sure we're thorough.
                             */
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
