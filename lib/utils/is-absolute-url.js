'use strict';

module.exports = (str) => {
    return /^(?:\w+:)?\/\//.test(str);
};
