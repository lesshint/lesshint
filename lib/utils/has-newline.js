'use strict';

module.exports = (str) => {
    return /\r?\n/.test(str);
};
