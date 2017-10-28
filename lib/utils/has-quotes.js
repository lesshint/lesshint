'use strict';

module.exports = (str, style) => {
    style = style || 'any';

    const styles = {
        any: /^"|'/,
        double: /^"/,
        single: /^'/
    };

    return styles[style].test(str);
};
