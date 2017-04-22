'use strict';

module.exports = function (str) {
    return /^(?:\w+:)?\/\//.test(str);
};
