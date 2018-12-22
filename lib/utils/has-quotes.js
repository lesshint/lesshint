'use strict';

module.exports = (str, style = 'any') => {
    const styles = {
        any: /"|'/,
        double: /"/,
        single: /'/
    };

    return styles[style].test(str);
};
