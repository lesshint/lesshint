'use strict';

module.exports = {
    name: 'singleLinePerProperty',
    nodeTypes: ['block'],
    message: 'Each property should be on its own line.',

    lint: function singleLinePerPropertyLinter (config, node) {
        var results = [];
        var self = this;

        ['declaration', 'include', 'extend', 'atrule', 'mixin'].forEach(function (type) {
            node.forEach(type, function (element, index) {
                var previousValid = self.isPreviousValid(node, element, index);
                var nextValid = self.isNextValid(node, element, index);

                // BOTH previous and next must be valid
                if (!(previousValid && nextValid)) {
                    results.push({
                        column: element.start.column,
                        line: element.start.line,
                        message: self.message
                    });
                }
            });
        });

        if (results.length) {
            return results;
        }
    },

    isPreviousValid: function (node, element, index) {
        var prev = node.get(index - 1);

        if (!prev) {
            // no previous sibling, assume beginning of block without new line, mark invalid
            return false;
        } else if (prev.type === 'space' && !prev.toString().match(/\n/)) {
            // previous sibling not new line
            return false;
        } else {
            return true;
        }
    },

    isNextValid: function (node, element, index) {
        var next = node.get(index + 2); // We need to move two nodes since the first one is the declaration delimiter (;)
        var isValid;

        if (!next) {
            // no next sibling, assume end of block without new line, mark invalid
            isValid = false;
        } else {
            switch (next.type) {
                case 'space':
                    if (next.content.match(/\n/)) {
                        isValid = true;
                    } else {
                        // sibling is not new line
                        var afterNext = node.get(index + 3);

                        if (!afterNext) {
                            // assume end of block without new line, mark invalid
                            isValid = false;
                        } else {
                            // only valid if followed by comment
                            if (afterNext.type === 'multilineComment' || afterNext.type === 'singlelineComment') {
                                isValid = true;
                            } else {
                                isValid = false;
                            }
                        }
                    }
                    break;
                case 'singlelineComment': // single-line comment butt up against declaration
                    isValid = true;
                    break;
                case 'multilineComment': // multi-line comment butt up against declaration
                    isValid = true;
                    break;
            }
        }

        return isValid;
    }
};
