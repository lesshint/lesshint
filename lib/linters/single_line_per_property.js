'use strict';

var isPreviousValid = function (node, element, index) {
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
};

var isNextValid = function (node, element, index) {
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
};

module.exports = function (options) {
    var config = options.config;
    var node = options.node;
    var results = [];

    // Bail if the linter isn't wanted
    if (!config.singleLinePerProperty || (config.singleLinePerProperty && !config.singleLinePerProperty.enabled)) {
        return null;
    }

    // Not applicable, bail
    if (node.type !== 'block') {
        return null;
    }

    node.forEach('declaration', function (element, index) {
        var previousValid = isPreviousValid(node, element, index);
        var nextValid = isNextValid(node, element, index);

        // BOTH previous and next must be valid
        if (!(previousValid && nextValid)) {
            results.push({
                column: element.start.column,
                line: element.start.line,
                message: 'Each property should be on its own line.'
            });
        }
    });

    if (results.length) {
        return results.map(function (result) {
            return {
                column: result.column,
                line: result.line,
                linter: 'singleLinePerProperty',
                message: result.message
            };
        });
    }

    return null;
};
