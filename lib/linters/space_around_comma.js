'use strict';

var util = require('util');

module.exports = {
    name: 'spaceAroundComma',
    nodeTypes: ['arguments', 'parentheses'],
    message: 'Commas should%s be %s by %s space.',

    lint: function spaceAroundCommaLinter (config, node) {
        var results = [];
        var self = this;

        node.forEach('operator', function (element, index) {
            var next = node.content[index + 1];
            var prev = node.content[index - 1];

            if (element.content !== ',') {
                return;
            }

            switch (config.style) {
                case 'after':
                    if (next.type !== 'space' || next.content !== ' ' && next.content.indexOf('\n') !== 0) {
                        results.push({
                            column: next.start.column,
                            line: next.start.line,
                            message: util.format(self.message, '', 'followed', 'one')
                        });
                    }

                    if (prev.type === 'space' && prev.content === ' ') {
                        results.push({
                            column: prev.end.column,
                            line: prev.end.line,
                            message: util.format(self.message, ' not', 'preceded', 'any')
                        });
                    }

                    break;
                case 'before':
                    if (prev.type !== 'space' || prev.content !== ' ') {
                        results.push({
                            column: prev.end.column,
                            line: prev.end.line,
                            message: util.format(self.message, '', 'preceded', 'one')
                        });
                    }

                    if (next.type === 'space' && next.content === ' ') {
                        results.push({
                            column: next.start.column,
                            line: next.start.line,
                            message: util.format(self.message, ' not', 'followed', 'any')
                        });
                    }

                    break;
                case 'both':
                    if (next.type !== 'space' || next.content !== ' ' || !/^\s/.test(next.content) ||
                       (prev.type !== 'space' || prev.content !== ' ') || !/\s$/.test(prev.content)
                    ) {
                        results.push({
                            column: (!/\s$/.test(prev.content) ? prev.end : next.start).column,
                            line: (!/\s$/.test(prev.content) ? prev.end : next.start).line,
                            message: util.format(self.message, '', 'preceded and followed', 'one')
                        });
                    }

                    break;
                case 'none':
                    if (next.type === 'space' || prev.type === 'space') {
                        results.push({
                            column: (prev.type === 'space' ? prev.end : next.start).column,
                            line: (prev.type === 'space' ? prev.end : next.start).line,
                            message: util.format(self.message, ' not', 'preceded nor followed', 'any')
                        });
                    }

                    break;
                default:
                    throw new Error(
                        'Invalid setting value for spaceAfterComma: ' + config.style
                    );
            }
        });

        if (results.length) {
            return results;
        }
    }
};
