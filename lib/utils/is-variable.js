'use strict';

module.exports = (input) => {
    if (typeof input === 'string') {
        return /^@/.test(input);
    }

    return input.type === 'atrule' && input.variable;
};
