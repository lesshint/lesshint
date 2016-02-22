'use strict';

var util = require('util');

module.exports = {
    name: 'spaceAroundOperator',
    nodeTypes: ['stylesheet'],
    message: 'Operators should%s be %s by %s space.',

    lint: function spaceAroundOperatorLinter (config, node) {
        var ignore = [':', ','];
        var results = [];
        var self = this;

        node.traverseByType('operator', function (element, index, parent) {
            var startElement;
            var nextElement;
            var prevElement;
            var message;

            if (ignore.indexOf(element.content) !== -1) {
                return;
            }

            nextElement = parent.content[index + 1];
            prevElement = parent.content[index - 1];

            if (typeof prevElement === 'undefined' || typeof nextElement === 'undefined') {
                return;
            }

            // Ignore font-size/line-height shorthand declaration
            if ((element.content === '/' && prevElement.type === 'dimension') &&
                (nextElement.type === 'dimension' || nextElement.type === 'number')) {
                return;
            }

            // Ignore negative numbers/regular shorthand natations
            if (element.content === '-' && prevElement.type === 'space' &&
                ['dimension', 'number', 'percentage'].indexOf(nextElement.type) !== -1) {
                return;
            }

            switch (config.style) {
                case 'both':
                    if (nextElement.type !== 'space' || nextElement.content !== ' ' || !/^\s/.test(nextElement.content) ||
                       (prevElement.type !== 'space' || prevElement.content !== ' ') || !/\s$/.test(prevElement.content)) {

                        startElement = !/\s$/.test(prevElement.content) ? prevElement : nextElement;
                        message = util.format(self.message, '', 'preceded and followed', 'one');
                    }

                    break;
                case 'none':
                    if (nextElement.type === 'space' || prevElement.type === 'space') {
                        startElement = prevElement.type === 'space' ? prevElement : nextElement;
                        message = util.format(self.message, ' not', 'preceded nor followed', 'any');
                    }

                    break;
                default:
                    throw new Error(
                        'Invalid setting value for spaceAfterOperator: ' + config.style
                    );
            }

            if (message) {
                results.push({
                    column: startElement.start.column,
                    line: startElement.start.line,
                    message: message
                });
            }
        });

        if (results.length) {
            return results;
        }
    }
};
