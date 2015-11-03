'use strict';

module.exports.ensureObject = function (obj) {
    return obj || {};
};

module.exports.isAbsoluteURL = function (str) {
    return /^(?:\w+:)?\/\//.test(str);
};
