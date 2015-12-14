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
                var previousValid = self.isPreviousValid(node, index);
                var nextValid = self.isNextValid(node, index);

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

    isPreviousValid: function (node, index) {
        var prev = node.get(index - 1);

        if (!prev || (prev.type === 'space' && !prev.toString().match(/\n/))) {
            // Previous sibling not new line
            return false;
        }

        return true;
    },

    isNextValid: function (node, index) {
        // Check next node first (might be the declaration delimiter (;) but we'll compensate for that later)
        var next = node.get(index + 1);
        var isValid;

        if (!next) {
            // No next sibling, assume end of block without new line, mark invalid
            isValid = false;
        } else {
            // Move forward one node if it's the declaration delimiter (;)
            if (next.type === 'declarationDelimiter') {
                next = node.get(index + 2);
            }

            if (!next) {
                isValid = false;
            } else {
                switch (next.type) {
                    case 'space':
                        if (next.content.match(/\n/)) {
                            isValid = true;
                        } else {
                            // Sibling is not new line
                            next = node.get(index + 3);

                            if (!next) {
                                // Assume end of block without new line, mark invalid
                                isValid = false;
                            } else if (next.type === 'multilineComment' || next.type === 'singlelineComment') {
                                // Only valid if followed by comment
                                isValid = true;
                            } else {
                                isValid = false;
                            }
                        }

                        break;
                    case 'singlelineComment': // Comment butt up against declaration
                    case 'multilineComment': // No break
                    case 'mixin': // "Chained" mixin, i.e. .foo.bar()
                        isValid = true;
                        break;
                }
            }
        }

        return isValid;
    }
};
