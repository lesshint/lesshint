'use strict';

module.exports.isAbsoluteURL = function (str) {
    return /^(?:\w+:)?\/\//.test(str);
};
