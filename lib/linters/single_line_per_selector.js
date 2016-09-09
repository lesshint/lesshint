'use strict';

// var helpers = require('../helpers');

module.exports = {
    name: 'singleLinePerSelector',
    nodeTypes: ['rule'],
    message: 'Each selector should be on its own line.',

    lint: function singleLinePerSelectorLinter (config, node) {
        var parser = require('postcss-selector-parser');
        var valid = true;
        var results = [];
        var self = this;
        var tree;

        parser(function (result) {
            tree = result;
        }).process(node.selector);

        tree.each(function (selector) {
            var reported = false;

            selector.each(function (thing) {
                var value = thing.toString().trim();

                // This selector is already reported, bail
                if (reported) {
                    return;
                }

                switch (config.style) {
                    case '18f':
                        if (value && value.length >= 5) {
                            valid = false;
                            return;
                        }
                        break;
                    default:
                        valid = false;
                        break;
                }

                if (!valid && tree.nodes.length > 1 && node.selector.indexOf('\n') === -1) {
                    reported = true;

                    results.push({
                        column: node.source.start.column + thing.source.start.column - 1,
                        line: node.source.start.line,
                        message: self.message
                    });
                }
            });
        });

        if (results.length) {
            return results;
        }
    }
};
